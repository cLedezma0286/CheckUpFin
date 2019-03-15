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
  name: string;
  percentage: number;
  subtitle: string;
  open_menu = false;
  actual_interview_id = null;
  @Input() show_menu: boolean;
  @Input() singout_only: boolean = false;
  constructor(public headerService: HeaderService, public clientsService: ClientsService, public router: Router){}
  ngOnInit() {
    this.headerService.current_percentage.subscribe(percentage => this.percentage = percentage);
    this.headerService.current_subtitle.subscribe(subtitle => this.subtitle = subtitle);
    if (JSON.parse(localStorage.getItem('client'))) {
      let client_cis = JSON.parse(localStorage.getItem('client')).num_clie_cis;
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
  @HostListener('document:click', ['$event'])
  closeHeaderMenuDOM(event){
    if (event.target.getAttribute('open_menu')) {
      this.open_menu = !this.open_menu;
    }else{
      this.open_menu = false;
    }
  }
}