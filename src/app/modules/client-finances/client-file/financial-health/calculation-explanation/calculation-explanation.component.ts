import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'calculation-explanation',
  templateUrl: 'calculation-explanation.view.html',
  styleUrls: ['calculation-explanation.style.scss']
})
export class CalculationExplanationComponent{
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  constructor(){}
  closeModal(){
    this.close.emit();
  }
}