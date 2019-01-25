import { Component, OnInit, Input } from '@angular/core';
import { ClientsService } from '@services/clients.service';
@Component({
  selector: 'dropdown',
  templateUrl: 'dropdown.view.html',
  styleUrls: ['dropdown.style.scss']
})
export class DropdownComponent{
  @Input() cis: string;
  constructor(public clientsService: ClientsService){}
  ngOnInit(){
    this.clientsService.getClientInformation(this.cis).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}