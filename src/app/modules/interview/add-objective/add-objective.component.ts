import { Component, OnInit, ViewChild, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'add-objective',
  templateUrl: 'add-objective.view.html',
  styleUrls: ['add-objective.style.scss']
})
export class AddObjectiveComponent implements OnInit{
  @ViewChild('question_0') question_0: ElementRef;
  @ViewChild('question_1') question_1: ElementRef;
  question_1_selected_option = 'meses';
  @ViewChild('question_2') question_2: ElementRef;
  actual_question_index = 0;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  objective_form: FormGroup = this.fb.group({
    'what_objective': ['', []],
    'when': ['', []],
    'how_many': ['', []],
  });
  /**
   * Constructor del componente para Agregar Objetivos
   * @param fb Servicio para manejar forms.
   */
  constructor(public fb: FormBuilder){}
  /**
   * Al iniciar el componente se define la primera pregunta como la activa
   */
  ngOnInit(){
    this['question_0'].nativeElement.focus();
  }
  /**
   * Función que detecta los eventos de teclear la flecha hacía abajo
   * Cuando se detecta este evento se establece la pasada pregunta como la activa
   */
  @HostListener('document:keyup.arrowUp', ['$event'])
  upShortcut(event: KeyboardEvent) {
    this.setPreviousQuestionAsActual();
  }
  /**
   * Función que detecta los eventos de teclear la flecha hacía arriba
   * Cuando se detecta este evento se establece la siguiente pregunta como la activa
   */
  @HostListener('document:keyup.arrowDown', ['$event'])
  downShortcut(event: KeyboardEvent) {
    this.setNextQuestionAsActual();
  }
  /**
   * Función que establece la pregunta activa
   * @params question_number número de la pregunta a poner como activa
   */
  setActualQuestion(question_number){
    this.actual_question_index = question_number;
  }
  /**
   * Función que establece la pregunta pasada como activa
   */
  setPreviousQuestionAsActual(){
    if (this.actual_question_index > 0) {
      this.actual_question_index = this.actual_question_index - 1;
      this[this.getQuestionName()].nativeElement.focus();
    }
  }
  /**
   * Función que establece la pregunta siguiente como activa
   */
  setNextQuestionAsActual(){
    if (this.actual_question_index < 2) {
      this.actual_question_index = this.actual_question_index + 1;
      this[this.getQuestionName()].nativeElement.focus();
    }
  }
  /**
   * Función que obtiene el nombre de la pregunta actual
   * @return cadena con el nombre de la pregunta activa
   */
  getQuestionName(){
    return 'question_' + this.actual_question_index;
  }
  /**
   * Función que establece el calor de la opción seleccionada de la pregunta 1
   * @param option_value valor a definir 
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
   * Función que revisa el formulario y exporta los valores del objetivo al padre
   */
  finishObjectiveForm(){
    let objective_aux = {
      nombre: this.objective_form.value.what_objective,
      fecha: (this.objective_form.value.when + ' ' + this.question_1_selected_option),
      valor: this.objective_form.value.how_many
    };
    this.closeModal(objective_aux);
  }
}