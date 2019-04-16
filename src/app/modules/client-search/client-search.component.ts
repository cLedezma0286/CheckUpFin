import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { switchMap, debounceTime } from 'rxjs/operators';
import { ClientsService } from '@services/clients.service';
@Component({
  selector: 'client-search',
  templateUrl: 'client-search.view.html',
  styleUrls: ['client-search.style.scss']
})
export class ClientSearchComponent{
  /**
   * Variable donde se captura el valor ingresado por el usuario para buscar clientes
   */
  cis = new FormControl();
  /**
   * Formulario donde se incluye el elemento que guarda el valor ingresado por el usuario
   */
  cis_form: FormGroup = this.fb.group({
    'cis': this.cis
  });
  /**
   * Arreglo dónde se guardan los clientes obtenidos al hacer la petición al servidor
   */
  clients = [];
  /**
   * Variable que establece si está en ejecución una búsqueda hacia el servidor
   */
  loading = false;
  /**
   * Constructor del componente principal para la búsqueda de clientes
   * @param {Router} router Servicio para manejo de direccionamiento de rutas
   * @param {FormBuilder} fb Proveedor de funcionalidades para manejo de formularios
   * @param {ClientsService} clientsService Servicio que provee métodos para hacer consultas http a las rutas de clientes
   */
  constructor(public router: Router, public fb: FormBuilder, public clientsService: ClientsService){}
  /**
   * Función proveída por la interfaz OnInit, aquí se declara el flujo que se realizará cuando el componente sea creado.
   * Se declara que lo que debe realizar el componente al ser creado es configurar el pipe para búsquedas de clientes.
   */
  ngOnInit() {
    this.searchClient();
  }
  /**
   * Función que realiza la petición para obtener los clientes.
   * Se utiliza la variable global 'cis' como parametro de las peticiones a servidor y en caso de una respuesta exitosa son guardados en el arreglo 'clients'.
   * Se utiliza un pipe que espera un tiempo determinado a que el usuario deje de ingresar valores para realizar la búsqueda.
   * Cada vez que el pipe es utilizado se debe de renovar su configuración, es por eso que al termino de la petición se vuelve a llamar a esta misma función.
   */
  searchClient() {
    this.cis.valueChanges.pipe(
      debounceTime(750),
      switchMap(id => {
        this.loading = true;
        return this.clientsService.getClientsMatchByCis(id);
      })
    ).subscribe(
      (res: any[]) => {
        this.clients = res;
        this.loading = false;
        this.searchClient();
      },
      error => {
        this.clients = [];
        this.loading = false;
        this.searchClient();
      }
    );
  }
}