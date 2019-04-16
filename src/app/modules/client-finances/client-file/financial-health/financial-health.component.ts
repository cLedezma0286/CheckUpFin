import { Component, OnInit, Renderer2, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsService } from '@services/clients.service';
import { ObjectivesService } from '@services/objectives.service';
import { FinancialHealth } from '@models/financial-health.model';
@Component({
  selector: 'financial-health',
  templateUrl: 'financial-health.view.html',
  styleUrls: ['financial-health.style.scss']
})
export class FinancialHealthComponent implements OnInit{
  name: string;
  age = null;
  calculation_explanation_open = false;
  objective_modal_open = false;
  financial_health: FinancialHealth = new FinancialHealth();
  objectives = [];
  objective_to_edit = null;
  simple_view = false;
  print_modal_open = false;
  /**
   * Constructor del componente de salud financiera
   * @param router Servicio para manejo de direccionamiento de rutas
   * @param route servicio para conocer datos mediante la ruta
   * @param clientsService Servicio que provee métodos para hacer consultas http a las rutas de clientes
   * @param objectivesServiceServicio que provee métodos para hacer consultas http a las rutas de servicios
   * @param renderer Elemento que provee una interacción directa con elementos definidos del DOM y sus atributos
   */
  constructor(public router: Router, public route: ActivatedRoute, public clientsService: ClientsService, public objectivesService: ObjectivesService, public renderer: Renderer2){}
  /**
   * Al iniciar el componente se obtiene al cliente guardado en localStorage, con esos datos se busca su información de salud financiera y objetivos
   * Se revisa si la vista tiene el parametro de simple_view que evita que algunos elementos se muestren
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
        this.age = response['fecha_nacimiento'];
      }
    );
    this.route.queryParams.subscribe(
      params => {
        if (params['simple_view']) {
          this.simple_view = true;
        }
      }
    );
  }
  /**
   * Función que regresa la edad en años obteniendo la fecha de nacimiento del cliente
   * @return edad en años
   */
  getYearsOfAge(){
    if (this.age) {
      let birthday = new Date(this.age);
      let age_dif_ms = Date.now() - birthday.getTime();
      let age_date = new Date(age_dif_ms);
      return Math.abs(age_date.getUTCFullYear() - 1970);
    }
    return 0;
  }

  /**
   * Función que escucha el evento de regreso en la ventana para evitarlo
   */
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    // console.log('Back button pressed FinancialHealthComponent');
    setTimeout(() => {
      this.router.navigate(['/interview'], { queryParams: {id: localStorage.getItem('actual_interview_id')}});
    }, 10);
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
   * Función que muestra la vista en la que se explica como se calcula la salud financiera
   */
  openCalculationExplanationModal(){
    this.setBodyScroll('hidden');
    this.calculation_explanation_open = true;
  }
  /**
   * Función que oculta la vista en la que se explica como se calcula la salud financiera
   */
  closeCalculationExplanationModal(){
    this.calculation_explanation_open = false;
    this.setBodyScroll('auto');
  }
  /**
   * Función que muestra la vista para editar o crear objetivos
   */
  openObjectiveModal(){
    this.setBodyScroll('hidden');
    this.objective_modal_open = true;
  }
  /**
   * Función que oculta la vista para editar o crear objetivos
   */
  closeObjectiveModal(objective){
    if (objective) {
      this.updateLocalObjectivesList(objective);
    }
    this.objective_modal_open = false;
    this.objective_to_edit = null;
    this.setBodyScroll('auto');
  }
  /**
   * Función que recibe un objetivo y lo actualiza en la lista local de objetivos
   */
  updateLocalObjectivesList(objective){
    for (var i = 0; i < this.objectives.length; i++) {
      if (objective.id === this.objectives[i].id) {
        this.objectives[i] = objective;
        return;
      }
    }
    this.objectives.push(objective);
  }
  /**
   * Función que establece el comportamiento del scroll de la página
   * @param {string} scroll_value Valor que se le asirnará al elemento body en su atributo overflow
   */
  setBodyScroll(scroll_value){
    this.renderer.setStyle(document.body, 'overflow', scroll_value);
  }
  /**
   * Función que dirige la página a la vista de productos
   */
  goToProducts(){
    this.router.navigate(['/client-finances/products']);
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
   * Función que muesta la vista de editar objetivo
   * @param objective el objetivo que se va a editar
   */
  editObjective(objective){
    this.objective_to_edit = objective;
    this.openObjectiveModal();
  }
  /**
   * Función que elimina objetivos en el servidor
   * @param objective_id id del objetivo a eliminar del servidor
   */
  deleteObjective(objective_id){
    this.objectivesService.deleteObjective(objective_id).subscribe(
      response => {
        this.deleteObjectiveLocal(objective_id);
      }
    );
  }
  /**
   * Función que elimina objetivos en el servidor
   * @param objective_id id del objetivo a eliminar del arreglo local
   */
  deleteObjectiveLocal(objective_id){
    for (var i = 0; i < this.objectives.length; i++) {
      if (objective_id === this.objectives[i].id) {
        this.objectives.splice(i, 1);
      }
    }
  }
  /**
   * Función que muestra la vista que imprime la información del cliente
   */
  openPrintModal(){
    this.setBodyScroll('hidden');
    this.print_modal_open = true;
  }
  /**
   * Función que oculta la vista en la que se imprime la información del cliente
   */
  closePrintModal(){
    this.print_modal_open = false;
    this.setBodyScroll('auto');
  }
}