import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@shared-services/header.service';
import { DashboardService } from './dashboard.service';
import { Client } from '@models/client.model';
import { FinancialHealth } from '@models/financial-health.model';
@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.view.html',
  styleUrls: ['dashboard.style.scss']
})
export class DashboardComponent implements OnInit{
  client_information: Client = new Client();
  financial_health: FinancialHealth = new FinancialHealth();
  products = [];
  constructor(public headerService: HeaderService, public dashboardService: DashboardService){}
  ngOnInit(){
    this.dashboardService.getClientInformation().subscribe(
      (response: Client) => {
        //this.client_information = response;
      }
    );
    this.dashboardService.getInterviewInformation().subscribe(
      response => {
        //this.financial_health = response['salud_financiera'];
      }
    );
    this.dashboardService.getProductsByObjectives().subscribe(
      response => {
        //this.products = response['productos'];
      }
    );
    this.headerService.changeSubtitle('Act / Service');
  }
  getYearsOfAge(){
    if (this.client_information.fecha_nacimiento) {
      let birthday = new Date(this.getDateForObjectFormat(this.client_information.fecha_nacimiento));
      let age_dif_ms = Date.now() - birthday.getTime();
      let age_date = new Date(age_dif_ms);
      return Math.abs(age_date.getUTCFullYear() - 1970);
    }
    return 0;
  }
  getDateForObjectFormat(date_dmy){
    let date_array_aux = date_dmy.split('/');
    return date_array_aux[2] + '/' + date_array_aux[1] + '/' + date_array_aux[0];
  }
  getHumanFormatDate(){
    if (this.client_information.fecha_nacimiento) {
      let date_array_aux = this.client_information.fecha_nacimiento.split('/');
      return date_array_aux[0] + ' de ' + this.getMonthName(date_array_aux[1]);
    }
    return '';
  }
  getMonthName(month){
    let month_number = Number(month);
    let month_name = '';
    switch(month_number) {
      case 1:
        month_name = 'enero';
        break;
      case 2:
        month_name = 'febrero';
        break;
      case 3:
        month_name = 'marzo';
        break;
      case 4:
        month_name = 'abril';
        break;
      case 5:
        month_name = 'mayo';
        break;
      case 6:
        month_name = 'junio';
        break;
      case 7:
        month_name = 'julio';
        break;
      case 8:
        month_name = 'agosto';
        break;
      case 9:
        month_name = 'septiembre';
        break;
      case 10:
        month_name = 'octubre';
        break;
      case 11:
        month_name = 'noviembre';
        break;
      case 12:
        month_name = 'diciembre';
    }
    return month_name;
  }
  getRate(full_rate){
    if(full_rate){
      return full_rate.split('/')[0];
    }
    return 0;
  }
  getRateNumber(full_rate){
    return Number(this.getRate(full_rate));
  }
}