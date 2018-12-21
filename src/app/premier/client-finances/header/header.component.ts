import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@shared-services/header.service';
@Component({
  selector: 'header',
  templateUrl: 'header.view.html',
  styleUrls: ['header.style.scss']
})
export class HeaderComponent implements OnInit{
  percentage: number;
  constructor(public headerService: HeaderService){}
  ngOnInit() {
    this.headerService.currentPercentage.subscribe(percentage => this.percentage = percentage);
  }
}