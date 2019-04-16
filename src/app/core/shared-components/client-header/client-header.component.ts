import { Component, OnInit, HostListener, Input } from '@angular/core';
import { HeaderService } from '@services/header.service';
import { ClientsService } from '@services/clients.service';
import { Router } from '@angular/router';
@Component({
  selector: 'client-header',
  templateUrl: 'client-header.view.html',
  styleUrls: ['client-header.style.scss']
})
export class ClientHeaderComponent implements OnInit{
  /**
   * Variable donde se almacena el nombre del cliente
   */
  name: string;
  /**
   * Variable donde se almacena el procentaje terminado de la entrevista
   */
  percentage: number;
  /**
   * Variable que representa el subtitulo que incluye el header
   */
  subtitle: string;
  /**
   * Variable condicional que de tener valor de verdadero muestra el menú, de ser falso este no es visible
   */
  open_menu = false;
  /**
   * Variable que guarda el id de la entrevista más resiente del cliente, se utiliza para saber que entrevista solicitar si se está continuando
   */
  actual_interview_id = null;
  /**
   * Input del componente que decide si el header debe mostrar el menu de hamburguesa
   */
  @Input() show_menu: boolean;
  /**
   * Input del componente que define si el componente mostrará solo la opción de cerrar sesión y las demás no
   */
  @Input() singout_only: boolean = false;
  /**
   * Input del componente que define si el componente mostrará la información del cliente
   */
  @Input() user_information_visible: boolean = true;
  /**
   * Constructor del componente de header
   * @param {HeaderService} headerService Servicio que provee interacción entre componentes con el header, además de solicitudes http de información del header
   * @param {ClientsService} clientsService Servicio que provee métodos para hacer consultas http a las rutas de clientes
   * @param {Router} router Servicio para manejo de direccionamiento de rutas
   */
  constructor(public headerService: HeaderService, public clientsService: ClientsService, public router: Router){}
  /**
   * Función proveída por la interfaz OnInit, aquí se declara el flujo que se realizará cuando el componente sea creado.
   * Al iniciar la aplicación el componente maneja las variables globales percentage y subtitle como compartidas a traves del servicio de header para que la información sea compartida a traves de cualquier componente
   * Luego revisa si ya se cuenta con un cliente guardado en localstorage, de ser asi se utiliza esa información para obtener los demás datos del cliente que se muestran en el header.
   */
  ngOnInit() {
    this.headerService.current_percentage.subscribe(percentage => this.percentage = percentage);
    this.headerService.current_subtitle.subscribe(subtitle => this.subtitle = subtitle);
    if (JSON.parse(localStorage.getItem('cliente'))) {
      let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
      this.clientsService.getClientInterviewInformation(client_cis).subscribe(
        response => {
          if (response['porcentaje_terminado']) {
            this.percentage = response['porcentaje_terminado'];
          }
          let actual_interview_id = JSON.parse(localStorage.getItem('actual_interview_id'));
          if (actual_interview_id) {
            this.actual_interview_id = actual_interview_id;
          }
        },
        error => {
          alert('Ha ocurrido un error');
        }
      );
      this.clientsService.getClientInformation(client_cis).subscribe(
        response => {
          this.name = response['primer_nombre'];
        },
        error => {
          alert('Ha ocurrido un error');
        }
      );
    }
  }
  /**
   * Función que detecta eventos de click, en caso de que se haga click en un elemento con atributo open_menu el menú invierte su estado, pasando de visible a oculto o viceversa.
   */
  @HostListener('document:click', ['$event'])
  closeHeaderMenuDOM(event){
    if (event.target.getAttribute('open_menu')) {
      this.open_menu = !this.open_menu;
    }else{
      this.open_menu = false;
    }
  }
}