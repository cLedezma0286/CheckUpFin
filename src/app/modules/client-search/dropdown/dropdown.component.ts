import { Component, OnInit, Input } from '@angular/core';
import { ClientsService } from '@services/clients.service';
import { Client } from '@models/client.model';
@Component({
  selector: 'dropdown',
  templateUrl: 'dropdown.view.html',
  styleUrls: ['dropdown.style.scss']
})
export class DropdownComponent{
  @Input() cis: string;
  client: Client;
  status = '';
  constructor(public clientsService: ClientsService){}
  ngOnInit(){
    this.clientsService.getClientInformation(this.cis).subscribe(
      (response: Client) => {
        this.client = response;
        console.log(this.client);
      },
      error => {
        
      }
    );
  }
}