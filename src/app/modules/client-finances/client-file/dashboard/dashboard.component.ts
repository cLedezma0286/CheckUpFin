import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '@services/header.service';
import { ClientsService } from '@services/clients.service'
import { Client } from '@models/client.model';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.view.html',
  styleUrls: ['dashboard.style.scss']
})
export class DashboardComponent implements OnInit{
  active_section = 'general';
  client_information: Client = new Client();

  /**
   * Constructor del componente Dashboard
   * @param {HeaderService} headerService Servicio que provee interacción entre componentes con el header, además de solicitudes http de información del header
   */
  constructor(public headerService: HeaderService, private router: Router, private clientsService: ClientsService){}
  /**
   * Al iniciar el componente se establece el subtitulo que aparece en el header
   */
  ngOnInit(){
    if(!localStorage.getItem('cliente')) this.router.navigate(['client-search']);
    let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
    this.headerService.changeSubtitle('Act / Service');
    this.clientsService.getClientInformation(client_cis).subscribe(
      (response: Client) => {
        this.client_information = response;
        // console.log('this.client_information', this.client_information);
      }
    );
  }

  /**
   * Función que regresa la información del usuario activo
   * @return active user info
   */
  getClientInformation(): Client {
    return this.client_information;
  }


  /**
   * Función que establece la sección activa del dashboard
   * @param section_name Nombre de la sección que se pondrá como activa
   */
  setActiveSection(section_name){
    this.active_section = section_name;
  }

  /**
   * Función que regresa la información del usuario activo
   * @return active user info
   */
  resetInfo(obj: Client) {
    this.client_information = obj;
    this.setActiveSection('general');
  }

  /**
   * Función que escucha el evento de regreso en la ventana para evitarlo
   */
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    // console.log('Back button pressed previus DASHBOARD');
    event.preventDefault();
    // this.router.navigate(['/interview'], { queryParams: {id: localStorage.getItem('actual_interview_id')}});
  }
}