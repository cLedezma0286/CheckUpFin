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

  constructor(public headerService: HeaderService, private router: Router, private clientsService: ClientsService){}
  ngOnInit(){
    if(!localStorage.getItem('cliente')) this.router.navigate(['client-search']);
    let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
    this.headerService.changeSubtitle('Act / Service');
    this.clientsService.getClientInformation(client_cis).subscribe(
      (response: Client) => {
        this.client_information = response;
        console.log('this.client_information', this.client_information);
      }
    );
  }

  getClientInformation(): Client {
    return this.client_information;
  }

  setActiveSection(section_name){
    this.active_section = section_name;
  }

  resetInfo(obj: Client) {
    this.client_information = obj;
    this.setActiveSection('general');
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed previus DASHBOARD');
    event.preventDefault();
    // this.router.navigate(['/interview'], { queryParams: {id: localStorage.getItem('actual_interview_id')}});
  }
}