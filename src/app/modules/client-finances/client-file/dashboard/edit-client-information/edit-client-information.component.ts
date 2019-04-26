import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '@models/client.model';
import { ClientsService } from '@services/clients.service';
@Component({
  selector: 'edit-client-information',
  templateUrl: 'edit-client-information.view.html',
  styleUrls: ['edit-client-information.style.scss']
})
export class EditClientInformationComponent implements OnInit{
  @Output() close_edit_section: EventEmitter<any> = new EventEmitter<any>();
  @Input('client_information') client_information: Client = new Client();
  name: string;
  next_checkup: string;
  user_information: FormGroup = this.fb.group({
    'position': [{value: '', disabled: true}, [
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
    'civil_status': [{value: '', disabled: true}, [
      Validators.maxLength(12)
    ]],
    'cis': [{value: '', disabled: true}, [
      Validators.maxLength(15)
    ]],
    'hobbies': ['', [
      Validators.maxLength(255)
    ]],
    'risk_profile': ['', []]
  });
  constructor(public clientsService: ClientsService, public fb: FormBuilder){}
  ngOnInit(){
    this.name = this.client_information.nombre_clie;
    this.next_checkup = this.client_information.sig_checkup;
    this.setFormValues(this.client_information);
  }
  setFormValues(user){
    setTimeout(() => {

      this.user_information.controls.position.setValue(user.ocupacion);
      this.user_information.controls.phone.setValue(user.telefono);
      this.user_information.controls.email.setValue(user.correo);
      this.user_information.controls.number_of_childrens.setValue(user.num_hijos);
      // console.log('date', user.fecha_nacimiento.replace(/-/gi,''));
      this.user_information.controls.birthday.setValue(user.fecha_nacimiento.replace(/-/gi,'/'));
      this.user_information.controls.civil_status.setValue(user.edo_civil);
      this.user_information.controls.cis.setValue(user.num_clie_cis);
      this.user_information.controls.hobbies.setValue(user.hobbies.join(', '));
      this.user_information.controls.risk_profile.setValue(user.perfil_riesgo);

    }, 20);

  }
  stringToHobbies(hobbies_string){
    let hobbies_array = hobbies_string.split(',');
    return hobbies_array.map(function(e){return e.trim()});
  }
  closeEditClientInformation(){
    this.close_edit_section.emit(this.client_information);
  }
  setClientPersonalInformation(){
    if (this.user_information.valid) {
      let user_aux = {
        nombre_clie: this.name,
        telefono: this.user_information.value.phone,
        ocupacion: this.user_information.controls.position.value,
        correo: this.user_information.value.email,
        fecha_nacimiento: this.getDateFormat(this.user_information.value.birthday),
        hobbies: this.stringToHobbies(this.user_information.value.hobbies),
        perfil_riesgo: this.user_information.value.risk_profile,
        sig_checkup: this.next_checkup,
        num_hijos: this.user_information.value.number_of_childrens
      }

      user_aux['edad'] = this.getYearsOfAge(user_aux.fecha_nacimiento);
      let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
      this.clientsService.setClientPersonalInformation(client_cis, user_aux).subscribe(
        (response: Client) => {
          // console.log(response);
          this.client_information = response;
          this.closeEditClientInformation();
        }
      );
    } else {
      alert('Ha ocurrido un error');
    }
  }

  getYearsOfAge(date: string){
    let birthday = new Date(date);
    let age_dif_ms = Date.now() - birthday.getTime();
    let age_date = new Date(age_dif_ms);
    return Math.abs(age_date.getUTCFullYear() - 1970);
    // console.log('getYearsOfAge INTERVIEW', client, this.clientAge);
  }

  getDateFormat(date){

    let theDate = date.replace(/\//g, '');
    return `${theDate.substring(0,4)}-${theDate.substring(4, 6)}-${theDate.substring(6)}`;
  }
}