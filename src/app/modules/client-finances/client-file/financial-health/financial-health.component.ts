import { Component, OnInit, Renderer2 } from '@angular/core';
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
  constructor(public router: Router, public route: ActivatedRoute, public clientsService: ClientsService, public objectivesService: ObjectivesService, public renderer: Renderer2){}
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
  getYearsOfAge(){
    if (this.age) {
      let birthday = new Date(this.age);
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
  openCalculationExplanationModal(){
    this.setBodyScroll('hidden');
    this.calculation_explanation_open = true;
  }
  closeCalculationExplanationModal(){
    this.calculation_explanation_open = false;
    this.setBodyScroll('auto');
  }
  openObjectiveModal(){
    this.setBodyScroll('hidden');
    this.objective_modal_open = true;
  }
  closeObjectiveModal(objective){
    if (objective) {
      this.updateLocalObjectivesList(objective);
    }
    this.objective_modal_open = false;
    this.objective_to_edit = null;
    this.setBodyScroll('auto');
  }
  updateLocalObjectivesList(objective){
    for (var i = 0; i < this.objectives.length; i++) {
      if (objective.id === this.objectives[i].id) {
        this.objectives[i] = objective;
        return;
      }
    }
    this.objectives.push(objective);
  }
  setBodyScroll(scroll_value){
    this.renderer.setStyle(document.body, 'overflow', scroll_value);
  }
  goToProducts(){
    this.router.navigate(['/client-finances/products']);
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
  editObjective(objective){
    this.objective_to_edit = objective;
    this.openObjectiveModal();
  }
  deleteObjective(objective_id){
    this.objectivesService.deleteObjective(objective_id).subscribe(
      response => {
        this.deleteObjectiveLocal(objective_id);
      }
    );
  }
  deleteObjectiveLocal(objective_id){
    for (var i = 0; i < this.objectives.length; i++) {
      if (objective_id === this.objectives[i].id) {
        this.objectives.splice(i, 1);
      }
    }
  }
  openPrintModal(){
    this.setBodyScroll('hidden');
    this.print_modal_open = true;
  }
  closePrintModal(){
    this.print_modal_open = false;
    this.setBodyScroll('auto');
  }
}