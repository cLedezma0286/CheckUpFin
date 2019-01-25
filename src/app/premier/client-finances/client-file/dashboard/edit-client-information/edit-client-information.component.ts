import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '@shared-services/clients.service';
@Component({
  selector: 'edit-client-information',
  templateUrl: 'edit-client-information.view.html',
  styleUrls: ['edit-client-information.style.scss']
})
export class EditClientInformationComponent implements OnInit{
  @Output() close_edit_section: EventEmitter<void> = new EventEmitter<void>();
  name: string;
  next_checkup: string;
  user_information: FormGroup = this.fb.group({
    'position': ['', [
      Validators.maxLength(50)
    ]],
    'phone': ['', [
      Validators.maxLength(15)
    ]],
    'email': ['', [
      Validators.maxLength(80)
    ]],
    'number_of_childrens': ['', []],
    'birthday': ['', []],
    'civil_status': ['', [
      Validators.maxLength(12)
    ]],
    'cis': ['', [
      Validators.maxLength(15)
    ]],
    'hobbies': ['', [
      Validators.maxLength(255)
    ]],
    'risk_profile': ['', []]
  });
  constructor(public clientsService: ClientsService, public fb: FormBuilder){}
  ngOnInit(){
    this.clientsService.getClientInformation(458747).subscribe(
      response => {
        this.name = response['nombre_clie'];
        this.next_checkup = response['sig_checkup'];
        this.setFormValues(response);
      }
    );
  }
  setFormValues(user){
    this.user_information.controls.position.setValue(user.ocupacion);
    this.user_information.controls.position.disable()
    this.user_information.controls.phone.setValue(user.telefono);
    this.user_information.controls.phone.disable();
    this.user_information.controls.email.setValue(user.correo);
    this.user_information.controls.email.disable();
    this.user_information.controls.number_of_childrens.setValue(user.num_hijos);
    this.user_information.controls.birthday.setValue(user.fecha_nacimiento);
    this.user_information.controls.birthday.disable();
    this.user_information.controls.civil_status.setValue(user.edo_civil);
    this.user_information.controls.civil_status.disable();
    this.user_information.controls.cis.setValue(user.num_clie_cis);
    this.user_information.controls.cis.disable();
    this.user_information.controls.hobbies.setValue(user.hobbies.join(', '));
    this.user_information.controls.risk_profile.setValue(user.perfil_riesgo);
  }
  stringToHobbies(hobbies_string){
    let hobbies_array = hobbies_string.split(',');
    return hobbies_array.map(function(e){return e.trim()});
  }
  closeEditClientInformation(){
    this.close_edit_section.emit();
  }
  setClientPersonalInformation(){
    if (this.user_information.valid) {
      let user_aux = {
        nombre_clie: this.name,
        telefono: this.user_information.value.phone,
        ocupacion: this.user_information.value.position,
        correo: this.user_information.value.email,
        fecha_nacimiento: this.user_information.value.birthday,
        hobbies: this.stringToHobbies(this.user_information.value.hobbies),
        perfil_riesgo: this.user_information.value.risk_profile,
        sig_checkup: this.next_checkup
      }
      this.clientsService.setClientPersonalInformation(user_aux).subscribe(
        response => {
          this.closeEditClientInformation();
        }
      );
    } else {
      alert('Campos con datos incorrectos');
    }
  }
  validateBirthdayFormat(){
    let new_birthday_value = this.user_information.value.birthday;
    new_birthday_value = new_birthday_value.replace(/[^0-9\/]+/g, '').replace('//', '/');
    if (new_birthday_value.match(/^\d{2}$/) !== null) {
      new_birthday_value = new_birthday_value + '/';
    } else if (new_birthday_value.match(/^\d{2}\/\d{2}$/) !== null) {
      new_birthday_value = new_birthday_value + '/';
    }
    new_birthday_value = new_birthday_value.substr(0, 10);
    this.user_information.controls.birthday.setValue(new_birthday_value);
  }
}