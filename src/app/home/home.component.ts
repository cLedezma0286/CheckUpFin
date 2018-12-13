import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: 'home.view.html',
  styleUrls: ['home.style.css']
})

export class HomeComponent{
  constructor( private router: Router){}
}