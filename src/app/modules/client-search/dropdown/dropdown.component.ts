import { Component, Input } from '@angular/core';
import { ClientsService } from '@services/clients.service';
import { Router } from '@angular/router';
@Component({
  selector: 'dropdown',
  templateUrl: 'dropdown.view.html',
  styleUrls: ['dropdown.style.scss']
})
export class DropdownComponent{
  @Input() client: any;
  @Input() loading: boolean;
  constructor(public clientsService: ClientsService, public router: Router){}
  setLocalClientInformation(){
    localStorage.setItem('client', JSON.stringify(this.client));
    this.clientsService.getClientInterviewInformation(this.client.num_clie_cis).subscribe(
      response => {
        localStorage.setItem('actual_interview_id', JSON.stringify(response['salud_financiera']['entrevista_id']));
        this.router.navigate(['/client-finances/client-file/dashboard']);
      }
    );
  }
}