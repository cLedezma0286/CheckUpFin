import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ClientsService } from '@services/clients.service';
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
  date = '';
  constructor(public clientsService: ClientsService){}
  ngOnInit(){
    let client_cis = JSON.parse(localStorage.getItem('client')).num_clie_cis;
    this.clientsService.getClientInterviewInformation(client_cis).subscribe(
      response => {
        this.financial_health = response['salud_financiera'];
        this.objectives = response['objetivos'];
      }
    );
    this.clientsService.getClientInformation(client_cis).subscribe(
      response => {
        this.name = response['nombre_clie'];
      }
    );
    this.date = this.getTodayDate();
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
  getTodayDate(){
    let date_aux = new Date();
    return date_aux.getDate() + '.' + this.getMonthName(date_aux.getMonth() + 1) + '.' + date_aux.getFullYear();
  }
  getMonthName(month){
    let month_name = '';
    switch(month) {
      case 1:
        month_name = 'Enero';
        break;
      case 2:
        month_name = 'Febrero';
        break;
      case 3:
        month_name = 'Marzo';
        break;
      case 4:
        month_name = 'Abril';
        break;
      case 5:
        month_name = 'Mayo';
        break;
      case 6:
        month_name = 'Junio';
        break;
      case 7:
        month_name = 'Julio';
        break;
      case 8:
        month_name = 'Agosto';
        break;
      case 9:
        month_name = 'Septiembre';
        break;
      case 10:
        month_name = 'Octubre';
        break;
      case 11:
        month_name = 'Noviembre';
        break;
      case 12:
        month_name = 'Diciembre';
    }
    return month_name;
  }
}