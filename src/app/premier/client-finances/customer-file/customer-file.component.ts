import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@shared-services/header.service';
@Component({
  selector: 'customer-file',
  templateUrl: 'customer-file.view.html',
  styleUrls: ['customer-file.style.scss']
})
export class CustomerFileComponent implements OnInit{
  active_section_name = 'dashboard';
  constructor(public headerService: HeaderService){}
  setActiveSectionName(section_name){
    this.active_section_name = section_name;
  }
  ngOnInit(){
    this.headerService.changeSubtitle('Act / Service');
  }
}