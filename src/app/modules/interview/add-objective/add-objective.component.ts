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
   * Función que detecta los eventos de teclear la flecha hacía arriba
   * Cuando se detecta este evento se establece la siguiente pregunta como la activa
   */
  @HostListener('document:keyup.arrowDown', ['$event'])
  downShortcut(event: KeyboardEvent) {
    // console.log('document:keyup', event.keyCode);

    if (event.keyCode === 38 || (event.keyCode === 9 && event.shiftKey)) { //Up
      this.setPreviousQuestionAsActual();
    }
    if (event.keyCode === 40 || (event.keyCode === 9  && !event.shiftKey)) { //Down
      this.setNextQuestionAsActual();
    }
    if (event.keyCode === 39) { //Right
      this.setNextOptionAsFocused(event.target['selectionStart']);
    }
    if (event.keyCode === 37) { //Left
      this.setPreviousOptionAsFocused();
    }
    if (event.keyCode === 13) { //Enter
      this.setActualOptionAsSelected();
    }
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
      this[this.getQuestionName()].nativeElement.click();
      setTimeout(() => this[this.getQuestionName()].nativeElement.focus(), 10);
    }
  }
  /**
   * Función que establece la pregunta siguiente como activa
   */
  setNextQuestionAsActual(){
    if (this.actual_question_index < 2) {
      this.actual_question_index = this.actual_question_index + 1;
      this[this.getQuestionName()].nativeElement.click();
      setTimeout(() => this[this.getQuestionName()].nativeElement.focus(), 10);
    }
  }


  setNextOptionAsFocused(selection_start?){
    if(this.actual_question_index === 1) {
      let options = Array.from(document.getElementsByClassName('second-q-option')),
          focusedOpt = options.filter(opt => opt.classList.contains('focused'))[0],
          unfocusedOpt = options.filter(opt => !opt.classList.contains('focused'))[0];

      if(!focusedOpt.classList.contains('option-two')) {
        if(focusedOpt.classList) focusedOpt.classList.remove('focused');
        if(unfocusedOpt.classList) unfocusedOpt.classList.add('focused');
      }
    }
  }
  setPreviousOptionAsFocused(){
    if(this.actual_question_index === 1) {
      let options = Array.from(document.getElementsByClassName('second-q-option')),
          focusedOpt = options.filter(opt => opt.classList.contains('focused'))[0],
          unfocusedOpt = options.filter(opt => !opt.classList.contains('focused'))[0];

      if(!focusedOpt.classList.contains('option-one')) {
        if(focusedOpt.classList) focusedOpt.classList.remove('focused');
        if(unfocusedOpt.classList) unfocusedOpt.classList.add('focused');
      }
    }
  }

  setActualOptionAsSelected(){

    if(this.actual_question_index === 1) {
      let options = Array.from(document.getElementsByClassName('second-q-option')),
          focusedOpt = options.filter(opt => opt.classList.contains('focused'))[0];

      options.map(opt => {
        if(opt.classList) opt.classList.remove('selected');
        if(opt.classList) opt.classList.remove('focused');
      });

      focusedOpt['click']();
      focusedOpt.classList.add('focused');
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