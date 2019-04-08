import { Component, OnInit, HostListener } from '@angular/core';
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

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed previus DASHBOARD');
    event.preventDefault();
    // this.router.navigate(['/interview'], { queryParams: {id: localStorage.getItem('actual_interview_id')}});
  }
}