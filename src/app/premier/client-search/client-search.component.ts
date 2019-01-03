import { Component } from '@angular/core';
import { ClientSearchService } from './client-search.service';
import { Router } from '@angular/router';
@Component({
  selector: 'client-search',
  templateUrl: 'client-search.view.html',
  styleUrls: ['client-search.style.scss']
})
export class ClientSearchComponent{
  cis_numer = '';
  clients = [];
  constructor(public clientSearchService: ClientSearchService, public router: Router){}
  searchClients(){
    this.clientSearchService.getClientsByCISNumber(this.cis_numer).subscribe(
      response => {
        this.clients = response['clientes'];
      },
      error => {
        console.log(error);
      }
    );
  }
  goToFinancialCheckUp(){
    this.router.navigate(['/client-finances/financial-check-up']);
  }
}