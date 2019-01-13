import { Component, Renderer2 } from '@angular/core';
@Component({
  selector: 'financial-health',
  templateUrl: 'financial-health.view.html',
  styleUrls: ['financial-health.style.scss']
})
export class FinancialHealthComponent{
  calculation_explanation_open = false;
  constructor(private renderer: Renderer2){}
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
}