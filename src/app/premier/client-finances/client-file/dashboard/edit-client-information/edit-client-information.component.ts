import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'edit-client-information',
  templateUrl: 'edit-client-information.view.html',
  styleUrls: ['edit-client-information.style.scss']
})
export class EditClientInformationComponent{
  @Output() close_edit_section: EventEmitter<void> = new EventEmitter<void>();
  constructor(){}
  closeEditClientInformation(){
    this.close_edit_section.emit();
  }
}