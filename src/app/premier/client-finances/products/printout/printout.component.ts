import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'printout',
  templateUrl: 'printout.view.html',
  styleUrls: ['printout.style.scss']
})
export class PrintoutComponent{
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  closeModal(){
    this.close.emit();
  }
}