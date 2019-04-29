import { Component, Input } from '@angular/core';
import { ClientsService } from '@services/clients.service';
import { Router } from '@angular/router';
@Component({
  selector: 'dropdown',
  templateUrl: 'dropdown.view.html',
  styleUrls: ['dropdown.style.scss']
})
export class DropdownComponent{
  /**
   * Arreglo que contiene los clientes
   */
  @Input() clients = [];
  /**
   * Variable que establece si hay una petición hacía el servidor en progreso
   */
  @Input() loading: boolean;
  /**
   * Constructor del componente que es la lista de clientes que se encontraron al hacer la búsqueda por cis
   * @param {ClientsService} clientsService Servicio que provee métodos para hacer consultas http a las rutas de clientes
   * @param {Router} router Servicio para manejo de direccionamiento de rutas
   */
  constructor(public clientsService: ClientsService, public router: Router){}
  /**
   * Función que guarda la información del cliente seleccionado por el usuario.
   * La función redirige a la vista dashboard del cliente.
   * @param {Client} client Cliente que se utilizará para navegar en la herramienta
   */
  setLocalClientInformation(client){
    localStorage.setItem('cliente', JSON.stringify(client));
    this.clientsService.getClientInterviewInformation(client.num_clie_cis).subscribe(
      response => {
        localStorage.setItem('actual_interview_id', JSON.stringify(response['salud_financiera']['entrevista_id']));
        this.router.navigate(['/client-finances/client-file/dashboard']);
      }
    );
  }
}