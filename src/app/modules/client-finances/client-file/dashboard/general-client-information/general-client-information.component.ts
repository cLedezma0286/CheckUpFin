import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClientsService } from '@services/clients.service';
import { InterviewService } from '@services/interview.service';
import { Client } from '@models/client.model';
import { FinancialHealth } from '@models/financial-health.model';
declare var jsCalendar: any;
@Component({
  selector: 'general-client-information',
  templateUrl: 'general-client-information.view.html',
  styleUrls: ['general-client-information.style.scss']
})
export class GeneralClientInformationComponent implements OnInit{
  client_information: Client = new Client();
  financial_health: FinancialHealth = new FinancialHealth();
  objectives = [];
  showCalendar=false;
  products = [];
  investments = [];
  @Output() show_edit_section: EventEmitter<void> = new EventEmitter<void>();
  constructor(public clientsService: ClientsService, public interviewService: InterviewService){}
  ngOnInit(){
    let client_cis = JSON.parse(localStorage.getItem('client')).num_clie_cis;
    this.clientsService.getClientInformation(client_cis).subscribe(
      (response: Client) => {
        this.client_information = response;
      }
    );
    this.clientsService.getClientInterviewInformation(client_cis).subscribe(
      response => {
        this.financial_health = response['salud_financiera'];
      }
    );
    this.clientsService.getClientProducts(client_cis).subscribe(
      response => {
        this.products = response['productos'];
      },
      error => {
        console.log(error);
      }
    );
    let actual_interview_id = JSON.parse(localStorage.getItem('actual_interview_id'));
    this.interviewService.getInterviewInvestments(actual_interview_id).subscribe(
      response => {
        this.investments = response['inversiones'];
      }
    );
  }
  changeCalendar() {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar)this.initCalendar();
  }
  initCalendar() {
    var checkExist = setInterval(() => {
      if(document.getElementById('my-calendar')){
        var element = document.getElementById('my-calendar');
        var calendar = jsCalendar.new(element,
          new Date(this.client_information.sig_checkup), {
          language: 'es',
          navigatorPosition: 'right'
        });
        calendar.onDateClick((event, date) => {
          if (date.getDay()%6 !== 0) {
            calendar.set(date);
            this.updateNextCheckup(date);
            this.showCalendar = false;
          }
        });
        clearInterval(checkExist);
      }
    },100);
  }
  updateNextCheckup(nextDate) {
    nextDate = nextDate.getFullYear() + '-' +
      ('0'+(nextDate.getMonth()+1)).slice(-2) + '-' +
      ('0' + nextDate.getDate()).slice(-2);
    var dateRequest = {
      'sig_checkup': nextDate
    };
    let client_cis = JSON.parse(localStorage.getItem('client')).num_clie_cis;
    this.clientsService.setNextCheckupClient(client_cis, dateRequest)
    .subscribe(
      (response: Client) => {
        this.client_information = response;
      }
    );
  }
  getYearsOfAge(){
    if (this.client_information.fecha_nacimiento) {
      let birthday = new Date(this.client_information.fecha_nacimiento);
      let age_dif_ms = Date.now() - birthday.getTime();
      let age_date = new Date(age_dif_ms);
      return Math.abs(age_date.getUTCFullYear() - 1970);
    }
    return 0;
  }
  getDateForObjectFormat(date_dmy){
    let date_array_aux = date_dmy.split('-');
    return date_array_aux[2] + '/' + date_array_aux[1] + '/' + date_array_aux[0];
  }
  getHumanFormatDate(){
    if (this.client_information.fecha_nacimiento) {
      let date_array_aux = this.client_information.fecha_nacimiento.split('-');
      return date_array_aux[2] + ' de ' + this.getMonthName(date_array_aux[1]);
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
  showEditUserInformationSection(){
    this.show_edit_section.emit();
  }
  objectiveToString(objective){
    let objective_string = objective.nombre;
    if (objective.valor) {
      objective_string = objective_string + '/ $' + objective.valor + ' MXN';
    }
    if (objective.fecha) {
      objective_string = objective_string + '/ ' + objective.fecha;
    }
    return objective_string;
  }
  getClientFinantialHealthState(financial_health_score){
    let score = this.getRateNumber(financial_health_score);
    if (score >= 7) {
      return 'Excelente';
    }else if (score >= 5) {
      return 'Bueno';
    }else {
      return 'Malo';
    }
  }
}