import { Component, OnInit, HostListener } from '@angular/core';
import { HeaderService } from '@shared-services/header.service';
import { Router } from '@angular/router';
@Component({
  selector: 'header',
  templateUrl: 'header.view.html',
  styleUrls: ['header.style.scss']
})
export class HeaderComponent implements OnInit{
  percentage: number;
  subtitle: string;
  open_menu = false;
  constructor(public headerService: HeaderService, public router: Router){}
  ngOnInit() {
    this.headerService.current_percentage.subscribe(percentage => this.percentage = percentage);
    this.headerService.current_subtitle.subscribe(subtitle => this.subtitle = subtitle);
  }
  @HostListener('document:click', ['$event'])
  closeHeaderMenuDOM(event){
    if (event.target.getAttribute('open_menu')) {
      this.open_menu = !this.open_menu;
    }else{
      this.open_menu = false;
    }
  }
  goToRoute(route){
    this.router.navigate([route]);
  }
}