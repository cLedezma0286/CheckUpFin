import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'client-finances',
  templateUrl: 'client-finances.view.html',
  styleUrls: ['client-finances.style.scss']
})

export class ClientFinancesComponent{
  constructor(public router: Router){}
}