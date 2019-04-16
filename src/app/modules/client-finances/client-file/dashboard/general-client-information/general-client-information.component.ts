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
  /**
   * Constructor del componente de que muestra la información del cliente en el dashboard.
   * @param clientsService Servicio que provee métodos para hacer consultas http a las rutas de clientes
   * @param interviewServiceServicio que provee métodos para hacer consultas http a las rutas de entrevista
   */
  constructor(public clientsService: ClientsService, public interviewService: InterviewService){}
  /**
   * Función proveída por la interfaz OnInit, aquí se declara el flujo que se realizará cuando el componente sea creado.
   * Se busca al cliente almacenado en localStorage y se utilizan sus datos para obtener su información de salud financiera, productos y de su entrevista
   */
  ngOnInit(){
    let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
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
  /**
   * Función que cambia el estado del calendario de visible a oculto o viceversa, en caso de que se tenga que mostrar el calendario se llama a la función que lo inicializa 
   */
  changeCalendar() {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar)this.initCalendar();
  }
  /**
   * Función que inicializa el calendario
   */
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
  /**
   * Cuando se selecciona una fecha del calendario esta se establece en el servidor como la fecha del siguiente checkup
   * @param nextDate fecha de tipo Date 
   */
  updateNextCheckup(nextDate) {
    nextDate = nextDate.getFullYear() + '-' +
      ('0'+(nextDate.getMonth()+1)).slice(-2) + '-' +
      ('0' + nextDate.getDate()).slice(-2);
    var dateRequest = {
      'sig_checkup': nextDate
    };
    let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
    this.clientsService.setNextCheckupClient(client_cis, dateRequest)
    .subscribe(
      (response: Client) => {
        this.client_information = response;
      }
    );
  }
  /**
   * Función que regresa la edad en años obteniendo la fecha de nacimiento del cliente
   * @return edad en años
   */
  getYearsOfAge(){
    if (this.client_information.fecha_nacimiento) {
      let birthday = new Date(this.client_information.fecha_nacimiento);
      let age_dif_ms = Date.now() - birthday.getTime();
      let age_date = new Date(age_dif_ms);
      return Math.abs(age_date.getUTCFullYear() - 1970);
    }
    return 0;
  }
  /**
   * Función para obtener una cadena de una fecha en formato dd/mm/aaaa
   * @param cadena con una fecha en formato aaaa-mm-ddd
   * @return cadena de una fecha en formato dd/mm/aaaa
   */
  getDateForObjectFormat(date_dmy){
    let date_array_aux = date_dmy.split('-');
    return date_array_aux[2] + '/' + date_array_aux[1] + '/' + date_array_aux[0];
  }
  /**
   * Funciín que regresa la fecha de nacimiento en formato legible
   * @return cadena en formato dd de mmmm
   */
  getHumanFormatDate(){
    if (this.client_information.fecha_nacimiento) {
      let date_array_aux = this.client_information.fecha_nacimiento.split('-');
      return date_array_aux[2] + ' de ' + this.getMonthName(date_array_aux[1]);
    }
    return '';
  }
  /**
   * Función que recibe el número de un mes y regresa el nombre de dicho mes
   * @param {number} month Cadena identificadora del mes
   * @return Cadena del nombre del mes.
   */
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
  /**
   * Función que recibe una cadena con la calificación completa de algún rubro y regresa una cadena con solo la calificación
   * @param {string} full_rate Cadena con la calificación completa de algún rubro
   * @return Cadena con solo la calificación del rubro
   */
  getRate(full_rate){
    if(full_rate){
      return full_rate.split('/')[0];
    }
    return 0;
  }
  /**
   * Función que recibe una cadena con la calificación completa de algún rubro y regresa un número con la calificación
   * @param {string} full_rate Cadena con la calificación completa de algún rubro
   * @return Número con la calificación del rubro
   */
  getRateNumber(full_rate){
    return Number(this.getRate(full_rate));
  }
  /**
   * Función que avisa al componente padre que debe ocultar este componete y mostrar el de editar información del cliente
   */
  showEditUserInformationSection(){
    this.show_edit_section.emit();
  }
  /**
   * Función que recibe un objetivo y regresa la información de ese objetivo en una cadena
   * @param objective Objetivo a obtener formato
   * @return cadena con la información del objetivo
   */
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
  /**
   * Función que recibe la calificación de algún rubro y regresa su estatus
   * @param cadena con la calificación
   * @return Cadena con el estatus
   */
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