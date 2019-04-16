import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'calculation-explanation',
  templateUrl: 'calculation-explanation.view.html',
  styleUrls: ['calculation-explanation.style.scss']
})
export class CalculationExplanationComponent{
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  constructor(){}
  /**
   * Función que avisa al componente padre que este componente debe ser eliminado
   */
  closeModal(){
    this.close.emit();
  }
}