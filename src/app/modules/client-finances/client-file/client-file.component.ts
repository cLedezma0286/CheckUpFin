import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@services/header.service';
@Component({
  selector: 'client-file',
  templateUrl: 'client-file.view.html',
  styleUrls: ['client-file.style.scss']
})
export class ClientFileComponent implements OnInit{
  active_section_name = 'dashboard';
  /**
   * Contructor del componente que maneja la información del cliente
   * @param {HeaderService} headerService Servicio que provee interacción entre componentes con el header, además de solicitudes http de información del header
   */
  constructor(public headerService: HeaderService){}
  /**
   * Función que establece la sección activa
   * @param section_name nombre de la sección a marcar como activa
   */
  setActiveSectionName(section_name){
    this.active_section_name = section_name;
  }
  /**
   * Al iniciar el componente se establece el subtitulo que se muestra en el header
   */
  ngOnInit(){
    this.headerService.changeSubtitle('Act / Service');
  }
}