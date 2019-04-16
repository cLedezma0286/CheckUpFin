import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@services/header.service';
@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.view.html',
  styleUrls: ['dashboard.style.scss']
})
export class DashboardComponent implements OnInit{
  active_section = 'general';
  /**
   * Constructor del componente Dashboard
   * @param {HeaderService} headerService Servicio que provee interacción entre componentes con el header, además de solicitudes http de información del header
   */
  constructor(public headerService: HeaderService){}
  /**
   * Al iniciar el componente se establece el subtitulo que aparece en el header
   */
  ngOnInit(){
    this.headerService.changeSubtitle('Act / Service');
  }
  /**
   * Función que establece la sección activa del dashboard
   * @param section_name Nombre de la sección que se pondrá como activa
   */
  setActiveSection(section_name){
    this.active_section = section_name;
  }
}