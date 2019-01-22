import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClientsService } from '@shared-services/clients.service';
import { InterviewService } from '@shared-services/interview.service';
import { Client } from '@models/client.model';
import { FinancialHealth } from '@models/financial-health.model';
import { timingSafeEqual } from 'crypto';
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
    this.clientsService.getClientInformation(458747).subscribe(
      (response: Client) => {
        this.client_information = response;
      }
    );
    this.clientsService.getClientInterviewInformation(458747).subscribe(
      response => {
        this.financial_health = response['salud_financiera'];
      }
    );
    this.clientsService.getClientProducts(458747).subscribe(
      response => {
        this.products = response['productos'];
      }
    );
    this.interviewService.getInterviewInvestments(1).subscribe(
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
      if(document.getElementById("my-calendar")){
        var element = document.getElementById("my-calendar");
        var calendar = jsCalendar.new(element,
          new Date(this.getDateForObjectFormat(this.client_information.sig_checkup)), {
          language: "es",
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
    nextDate = ("0" + nextDate.getDate()).slice(-2) + "/" +
      ("0"+(nextDate.getMonth()+1)).slice(-2) + "/" +
      nextDate.getFullYear();
    var dateRequest = {
      'sig_checkup': nextDate
    };
    this.clientsService.setNextCheckupClient(458747, dateRequest)
    .subscribe(
      response => {
        this.client_information = response;
      }
    );
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