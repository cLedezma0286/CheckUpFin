import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'home',
  templateUrl: 'home.view.html',
  styleUrls: ['home.style.scss']
})
export class HomeComponent{
  constructor(public router: Router){}
  goToEDRASLoader(){
    this.router.navigate(['/loading/edras']);
  }
}