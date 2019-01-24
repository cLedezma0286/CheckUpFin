import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@shared-services/header.service';
import { ClientsService } from '@shared-services/clients.service';
import { Router } from '@angular/router';
@Component({
  selector: 'header',
  templateUrl: 'header.view.html',
  styleUrls: ['header.style.scss']
})
export class HeaderComponent implements OnInit{
  name: string;
  percentage: number;
  subtitle: string;
  open_menu = false;
  constructor(public headerService: HeaderService, public clientsService: ClientsService, public router: Router){}
  ngOnInit() {
    this.headerService.current_percentage.subscribe(percentage => this.percentage = percentage);
    this.headerService.current_subtitle.subscribe(subtitle => this.subtitle = subtitle);
    this.clientsService.getClientInterviewInformation(458747).subscribe(
      response => {
        this.percentage = response['porcentaje_terminado'];
      },
      error => {
        alert('Ha ocurrido un error');
      }
    );
    this.clientsService.getClientInformation(458747).subscribe(
      response => {
        this.name = response['primer_nombre'];
      },
      error => {
        alert('Ha ocurrido un error');
      }
    );
  }
}