import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@shared-services/header.service';
@Component({
  selector: 'header',
  templateUrl: 'header.view.html',
  styleUrls: ['header.style.scss']
})
export class HeaderComponent implements OnInit{
  percentage: number;
  open_menu = false;
  constructor(public headerService: HeaderService){}
  ngOnInit() {
    this.headerService.currentPercentage.subscribe(percentage => this.percentage = percentage);
  }
  @HostListener('document:click', ['$event'])
  closeHeaderMenuDOM(event){
    if (event.target.getAttribute('open_menu')) {
      this.open_menu = !this.show_menu;
    }else{
      this.open_menu = false;
    }
  }
}