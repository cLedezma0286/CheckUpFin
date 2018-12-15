import { Component } from "@angular/core";
import { ClientSearchService } from './client-search.service';
@Component({
  selector: 'client-search',
  templateUrl: 'client-search.view.html',
  styleUrls: ['client-search.style.scss']
})
export class ClientSearchComponent{
  cis_numer = null;
  clients = [];
  constructor(public clientSearchService: ClientSearchService){}
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
}