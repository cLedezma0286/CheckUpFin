import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ClientsService } from '@shared-services/clients.service';
import { FinancialHealth } from '@models/financial-health.model';
@Component({
  selector: 'printout',
  templateUrl: 'printout.view.html',
  styleUrls: ['printout.style.scss']
})
export class PrintoutComponent implements OnInit{
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  financial_health: FinancialHealth = new FinancialHealth();
  objectives = [];
  name: string;
  constructor(public clientsService: ClientsService){}
  ngOnInit(){
    this.clientsService.getClientInterviewInformation(458747).subscribe(
      response => {
        this.financial_health = response['salud_financiera'];
        this.objectives = response['objetivos'];
      }
    );
    this.clientsService.getClientInformation(458747).subscribe(
      response => {
        this.name = response['nombre_clie'];
      }
    );
  }
  getRateNumber(full_rate){
    return Number(this.getRate(full_rate));
  }
  getRate(full_rate){
    if(full_rate){
      return full_rate.split('/')[0];
    }
    return 0;
  }
  closeModal(){
    this.close.emit();
  }
}