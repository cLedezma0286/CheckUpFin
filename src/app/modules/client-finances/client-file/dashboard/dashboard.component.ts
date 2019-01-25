import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@services/header.service';
@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.view.html',
  styleUrls: ['dashboard.style.scss']
})
export class DashboardComponent implements OnInit{
  active_section = 'general';
  constructor(public headerService: HeaderService){}
  ngOnInit(){
    this.headerService.changeSubtitle('Act / Service');
  }
  setActiveSection(section_name){
    this.active_section = section_name;
  }
}