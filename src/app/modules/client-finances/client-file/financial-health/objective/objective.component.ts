import { Component, OnInit, ViewChild, ElementRef, HostListener, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjectivesService } from '@services/objectives.service';
@Component({
  selector: 'objective',
  templateUrl: 'objective.view.html',
  styleUrls: ['objective.style.scss']
})
export class ObjectiveComponent implements OnInit{
  @ViewChild('question_0') question_0: ElementRef;
  @ViewChild('question_1') question_1: ElementRef;
  question_1_selected_option = 'meses';
  @ViewChild('question_2') question_2: ElementRef;
  actual_question_index = 0;
  @Input() interview_id: number;
  @Input() objective: any;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  objective_form: FormGroup = this.fb.group({
    'what_objective': ['', []],
    'when': ['', []],
    'how_many': ['', []],
  });
  /**
   * Contructor del componente que agrega objetivos al cliente
   * @param objectivesService Servicio que ofrece métodos para hacer peticiones http a rutas de objetivos
   * @param fb Servicio de manejo de forms
   */
  constructor(public objectivesService: ObjectivesService, public fb: FormBuilder){}
  /**
   * Al iniciar el componente el primer input se debe marcar como seleccionado
   * Si el componente padre está pasando un objetivo los valores de este se cargan en los inputs
   */
  ngOnInit(){
    this['question_0'].nativeElement.focus();
    if (this.objective) {
      this.loadObjectiveValues();
    }
  }
  /**
   * Función que carga los valores del objetivo obtenido en sus respectivos campos
   */
  loadObjectiveValues(){
    this.objective_form.controls.what_objective.setValue(this.objective.nombre);
    this.objective_form.controls.when.setValue(this.getAmountFromDate(this.objective.fecha));
    this.question_1_selected_option = this.getTypeFromDate(this.objective.fecha);
    this.objective_form.controls.how_many.setValue(this.objective.valor);
  }
  /**
   * Función que obtiene la cantidad de unidades de una fecha
   * @param date cadena con una cantidad de tiempo
   * @return la cantidad de unidades
   */
  getAmountFromDate(date){
    let date_date_array = date.split(' ');
    let amount_string = '';
    for (var i = 0; i < date_date_array.length - 1; i++) {
      amount_string = amount_string + date_date_array[i] + ' ';
    }
    return amount_string.trim();
  }
  /**
   * Función para obtener el tipo de unidad de una cantidad de tiempo
   * @param date Cadena que representa una cantidad de tiempo
   * @return el tipo de unidad de tiempo utilizada
   */
  getTypeFromDate(date){
    let date_date_array = date.split(' ');
    return date_date_array[date_date_array.length - 1];
  }
  /**
   * Función que detecta cuando el cliente teclea la flecha hacía arriba
   * Cuando se teclea la flecha hacía arriba se muestra la pregunta previa a la actual
   */
  @HostListener('document:keyup.arrowUp', ['$event'])
  upShortcut(event: KeyboardEvent) {
    this.setPreviousQuestionAsActual();
  }
  /**
   * Función que detecta cuando el cliente teclea la flecha hacía abajo
   * Cuando se teclea la flecha hacía abajo se muestra la pregunta siguiente a la actual
   */
  @HostListener('document:keyup.arrowDown', ['$event'])
  downShortcut(event: KeyboardEvent) {
    this.setNextQuestionAsActual();
  }
  /**
   * Función que determina cual es la pregunta actual
   * @param question_number número de la pregunta
   */
  setActualQuestion(question_number){
    this.actual_question_index = question_number;
  }
  /**
   * Función que determina la pregunta pasada como la activa
   */
  setPreviousQuestionAsActual(){
    if (this.actual_question_index > 0) {
      this.actual_question_index = this.actual_question_index - 1;
      this[this.getQuestionName()].nativeElement.focus();
    }
  }
  /**
   * Función que determina la pregunta siguiente como la activa
   */
  setNextQuestionAsActual(){
    if (this.actual_question_index < 2) {
      this.actual_question_index = this.actual_question_index + 1;
      this[this.getQuestionName()].nativeElement.focus();
    }
  }
  /**
   * Función que regresa el nombre de la variable que representa a la pregunta activa
   * @return cadena con el nombre de la pregunta activa
   */
  getQuestionName(){
    return 'question_' + this.actual_question_index;
  }
  /**
   * Función que establece el valor de la opción elegida de la pregunta 1
   * @param option_value valor de la opción elegida 
   */
  setQuestionOneOptionValue(option_value){
    this.question_1_selected_option = option_value;
  }
  /**
   * Función que avisa al componente padre que debe eliminar este componente
   */
  closeModal(objective){
    this.close.emit(objective);
  }
  /**
   * Función que revisa el formulario y guarda la información ingresada para guardar el objetivo
   */
  finishObjectiveForm(){
    let objective_aux = {
      nombre: this.objective_form.value.what_objective,
      fecha: (this.objective_form.value.when + ' ' + this.question_1_selected_option),
      valor: this.objective_form.value.how_many,
      entrevista_id: this.interview_id
    };
    if (this.objective) {
      this.objectivesService.editObjective(this.objective.id, objective_aux).subscribe(
        response => {
          this.closeModal(response);
        },
        error => {
          alert('Ha ocurrido un error');
        }
      );
    } else {
      this.objectivesService.createObjective(objective_aux).subscribe(
        response => {
          this.closeModal(response);
        },
        error => {
          alert('Ha ocurrido un error');
        }
      );
    }
  }
}