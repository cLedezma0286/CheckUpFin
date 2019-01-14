import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'financial-health',
  templateUrl: 'financial-health.view.html',
  styleUrls: ['financial-health.style.scss']
})
export class FinancialHealthComponent{
  calculation_explanation_open = false;
  constructor(public router: Router, public renderer: Renderer2){}
  openCalculationExplanationModal(){
    this.setBodyScroll('hidden');
    this.calculation_explanation_open = true;
  }
  closeCalculationExplanationModal(){
    this.calculation_explanation_open = false;
    this.setBodyScroll('auto');
  }
  setBodyScroll(scroll_value){
    this.renderer.setStyle(document.body, 'overflow', scroll_value);
  }
  goToProducts(){
    this.router.navigate(['/client-finances/products']);
  }
}