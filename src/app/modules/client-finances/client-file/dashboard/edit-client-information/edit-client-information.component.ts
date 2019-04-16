import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '@services/clients.service';
@Component({
  selector: 'edit-client-information',
  templateUrl: 'edit-client-information.view.html',
  styleUrls: ['edit-client-information.style.scss']
})
export class EditClientInformationComponent implements OnInit{
  /**
   * Variable que se utiliza para avisar al componente padre que se debe borrar este componente
   */
  @Output() close_edit_section: EventEmitter<void> = new EventEmitter<void>();
  /**
   * Variable que se utiliza para mostrar el nombre del cliente
   */
  name: string;
  /**
   * Variable que se utiliza para mostrar la fecha del siguiente checkup.
   */
  next_checkup: string;
  /**
   * Formulario que contiene los campos de la información del usuario con sus validaciones correspondientes
   */
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
  /**
   * Constructor del componente que representa la vista de editar información del cliente
   * @param {ClientsService} clientsService Servicio que provee métodos para hacer consultas http a las rutas de clientes
   * @param {FormBuilder} fb Proveedor de funcionalidades para manejo de formularios
   */
  constructor(public clientsService: ClientsService, public fb: FormBuilder){}
  /**
   * Función proveída por la interfaz OnInit, aquí se declara el flujo que se realizará cuando el componente sea creado.
   * Se declara que lo que debe realizar el componente al ser creado es obtener sus valores almacenados en localStorage
   * para después buscar su información completa en el servidor,
   * una vez obtenida la información se guardan el nombre y la fecha del siguiente checkup.
   * Al final se manda a llamar a la función que establece los valores del clinte en sus campos determinados.
   */
  ngOnInit(){
    let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
    this.clientsService.getClientInformation(client_cis).subscribe(
      response => {
        this.name = response['nombre_clie'];
        this.next_checkup = response['sig_checkup'];
        this.setFormValues(response);
      }
    );
  }
  /**
   * Función que recibe un usuario y establece sus valores en los campos del formulario correspondientes.
   * @param {Client} user Cliente cuyos valores serán establecidos en el formulario
   */
  setFormValues(user){
    this.user_information.controls.position.setValue(user.ocupacion);
    this.user_information.controls.phone.setValue(user.telefono);
    this.user_information.controls.email.setValue(user.correo);
    this.user_information.controls.number_of_childrens.setValue(user.num_hijos);
    this.user_information.controls.birthday.setValue(user.fecha_nacimiento.replace('-','/').replace('-','/'));
    this.user_information.controls.civil_status.setValue(user.edo_civil);
    this.user_information.controls.cis.setValue(user.num_clie_cis);
    this.user_information.controls.hobbies.setValue(user.hobbies.join(', '));
    this.user_information.controls.risk_profile.setValue(user.perfil_riesgo);
  }
  /**
   * Función que recibe una cadena se hobbies y los regresa como elementos de un arreglo
   * @param {string} hobbies_string Cadena de hobbies separada por comas
   * @returns Arreglo que tiene como elementos los hobbies
   */
  stringToHobbies(hobbies_string){
    let hobbies_array = hobbies_string.split(',');
    return hobbies_array.map(function(e){return e.trim()});
  }
  /**
   * Función que emite el output al componente padre para informarle que debe ocultar este componente y mostrar el de informacion
   */
  closeEditClientInformation(){
    this.close_edit_section.emit();
  }
  /**
   * Función que obtiene los datos ingresados por el usuario en el formulario y si este es valido realiza la petición para guardar dicha información 
   */
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
      let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
      this.clientsService.setClientPersonalInformation(client_cis, user_aux).subscribe(
        response => {
          this.closeEditClientInformation();
        }
      );
    } else {
      alert('Ha ocurrido un error');
    }
  }
  /**
   * Función que obtiene una cadena en forma de cadena representando una fecha del input de cumpleaños y regresa la fecha en formato correcto para el back
   * @param {string} date Fecha con formato AAAA/MM/DD 
   */
  getDateFormat(date){
    let date_array = date.replace('/','-').replace('/','-');
    date_array = date_array.split('-');
    date_array = date_array[0] + '-' +
      ('0'+(date_array[1])).slice(-2) + '-' +
      ('0' + date_array[2]).slice(-2);;
    return date_array;
  }
  /**
   * Función que toma el valor actual que el cliente ingresa para el campo de cumpleaños y valida que la estructura sea correcta, en caso de no serlo cambia el valor ingresado a uno valido.
   */
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