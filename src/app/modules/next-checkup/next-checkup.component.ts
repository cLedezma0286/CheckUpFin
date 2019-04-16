import { Component, Renderer2, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '@models/client.model';
import { ClientsService } from '@services/clients.service';
declare var jsCalendar: any;

@Component({
  selector: 'nextCheckup',
  templateUrl: 'next-checkup.view.html',
  styleUrls: ['next-checkup.style.scss']
})
export class NextCheckupComponent implements OnInit{
  firstView = true;
  showCalendar = false;
  name;
  nextCheckupDate;
  client_information;
  dateRequest;
  /**
   * Constructor del componente de Siguiente checkup
   * @param {Renderer2} renderer Elemento que provee una interacción directa con elementos definidos del DOM y sus atributos
   * @param {ClientsService} clientsService Servicio que provee métodos para hacer consultas http a las rutas de clientes
   */
  constructor(public renderer: Renderer2, public clientsService: ClientsService,
    public router: Router, public fb: FormBuilder){}
  /**
   * Al iniciar el componente se busca al cliente guardado en el localStorage y con esa información se busca su información de siguiente checkup
   */
  ngOnInit() {
    let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
    this.clientsService.getClientInformation(client_cis).subscribe(
      (response: Client) => {
        this.client_information = response;
        this.nextCheckupDate = this.getDateForObjectFormat(this.client_information.sig_checkup);
        this.updateNextCheckup(this.getDateObject(this.nextCheckupDate));
      }
    );
    this.name = JSON.parse(localStorage.getItem('cliente'))['nombre_clie'];
  }
  /**
   * @param date una cadena representando una fecha
   * @return un objeto de tipo date
   */
  getDateObject(date){
    let date_array = date.split('/');
    let date_string = date_array[2] + '-' + date_array[1] + '-' + date_array[0];
    let date_object = new Date(date_string);
    return date_object;
  }
  /**
   * Función que cambia el estado del calendario de visible a oculto o viceversa, en caso de que se tenga que mostrar el calendario se llama a la función que lo inicializa 
   */
  changeCalendar() {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar)this.initCalendar();
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
    this.nextCheckupDate = ('0' + nextDate.getDate()).slice(-2) + '/' +
      ('0'+(nextDate.getMonth()+1)).slice(-2) + '/' +
      nextDate.getFullYear();
    nextDate = nextDate.getFullYear() + '-' +
      ('0'+(nextDate.getMonth()+1)).slice(-2) + '-' +
      ('0' + nextDate.getDate()).slice(-2);
    this.dateRequest = {
      'sig_checkup': nextDate
    };
  }
  /**
   Función que actualiza en el servidor la fecha de siguiente checkup elegida por el cliente
   */
  confirmNextCheckup() {
    let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
    this.clientsService.setNextCheckupClient(client_cis, this.dateRequest)
    .subscribe(
    response => {
      this.firstView = !this.firstView;
    });
  }
  /**
   * Función que dirige la página a la vista de dashboard
   */
  goToDashboard() {
    this.router.navigate(['/client-finances/client-file/dashboard']);
  }
}