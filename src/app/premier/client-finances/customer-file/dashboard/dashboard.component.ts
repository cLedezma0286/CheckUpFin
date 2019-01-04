import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@shared-services/header.service';
@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.view.html',
  styleUrls: ['dashboard.style.scss']
})
export class DashboardComponent implements OnInit{
  constructor(public headerService: HeaderService){}
  ngOnInit(){
    this.headerService.changeSubtitle('Act / Service');
  }
}