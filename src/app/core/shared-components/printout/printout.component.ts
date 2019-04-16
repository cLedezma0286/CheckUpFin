import { Component, OnInit, OnDestroy, EventEmitter, Output, Renderer2 } from '@angular/core';
import { ClientsService } from '@services/clients.service';
import { FinancialHealth } from '@models/financial-health.model';
@Component({
  selector: 'printout',
  templateUrl: 'printout.view.html',
  styleUrls: ['printout.style.scss']
})
export class PrintoutComponent implements OnInit, OnDestroy{
  /**
   * Output del componente que emite un evento avisando al componente padre que se debe eliminar este componente
   */
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  /**
   * Variable que se inicializa con todos los atributos del tipo FinancialHealth
   */
  financial_health: FinancialHealth = new FinancialHealth();
  /**
   * Arreglo que guarda la lista de objetivos
   */
  objectives = [];
  /**
   * Variable donde se almacena el nombre del cliente
   */
  name: string;
  /**
   * Variable donde se guardará la fecha de hoy en formato dddd.mm.aa
   */
  date = '';
  /**
   * Constructor del componente que muestra la vista con información a imprimir
   * @param {ClientsService} clientsService Servicio que provee métodos para hacer consultas http a las rutas de clientes
   * @param {Renderer2} renderer Elemento que provee una interacción directa con elementos definidos del DOM y sus atributos
   */
  constructor(public clientsService: ClientsService, public renderer: Renderer2){}
  /**
   * Función proveída por la interfaz OnInit, aquí se declara el flujo que se realizará cuando el componente sea creado.
   * Al iniciar se obtiene del localStorage el cliente almacenado, utilizanso su información se busca su información tanto de salud financiera como suya en el servidor
   * Se obtiene la fecha del día de hoy en formato dddd.mm.aa
   */
  ngOnInit(){
    let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
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
  /**
   * Función que recibe una cadena con la calificación completa de algún rubro y regresa un número con la calificación
   * @param {string} full_rate Cadena con la calificación completa de algún rubro
   * @return Número con la calificación del rubro
   */
  getRateNumber(full_rate){
    return Number(this.getRate(full_rate));
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
   * Función que avisa al componete padre que este componente debe ser eliminado
   */
  closeModal(){
    this.close.emit();
  }
  /**
   * Función para obtener la fecha de hoy en formato dddd.mm.aa
   * @return Cadena con la fecha de hoy en formato dddd.mm.aa
   */
  getTodayDate(){
    let date_aux = new Date();
    return date_aux.getDate() + '.' + this.getMonthName(date_aux.getMonth() + 1) + '.' + date_aux.getFullYear();
  }
  /**
   * Función que recibe el número de un mes y regresa el nombre de dicho mes
   * @param {number} month Número identificador del mes
   * @return Cadena del nombre del mes.
   */
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
  /**
   * Función proveída por la interfaz OnDestroy, aquí se declara el flujo que se realizará cuando el componente de elimine.
   * Se indica que el scroll de la vista se debe regresar a su valor 'auto'
   */
  ngOnDestroy(){
    this.setBodyScroll('auto');
  }
  /**
   * Función que establece el comportamiento del scroll de la página
   * @param {string} scroll_value Valor que se le asirnará al elemento body en su atributo overflow
   */
  setBodyScroll(scroll_value){
    this.renderer.setStyle(document.body, 'overflow', scroll_value);
  }
  /**
   * Función que abre la ventana de impresión del navegador
   */
  print(){
    window.print();
  }
}