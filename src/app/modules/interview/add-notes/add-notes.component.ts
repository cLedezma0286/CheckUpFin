import { Component, OnInit, ViewChild, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'add-notes',
  templateUrl: 'add-notes.view.html',
  styleUrls: ['add-notes.style.scss']
})
export class AddNotesComponent implements OnInit{
  @ViewChild('question_0') question_0: ElementRef;
  @ViewChild('question_1') question_1: ElementRef;
  actual_question_index = 0;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  note_form: FormGroup = this.fb.group({
    'title': ['', []],
    'text': ['', []]
  });
  /**
   * Contructor del componente que Agregar notas
   * @param fb Servicio para manejar forms.
   */
  constructor(public fb: FormBuilder){}
  /**
   * Al iniciar el componente se debe marcar como activa la primer pregunta
   */
  ngOnInit(){
    this['question_0'].nativeElement.focus();
  }
  /**
   * Función que indica al componente padre que debe eliminar este componente, puede pasar una nota en el proceso
   * @param note Datos de la nota que el cliente quiere agregar
   */
  closeModal(note){
    this.close.emit(note);
  }
  /**
   * Función que captura eventos de tecleo de la flecha de arriba
   * En caso de que el cliente teclee la flecha de arriba se establece la pregunta anterior como la activa
   */
  @HostListener('document:keyup.arrowUp', ['$event'])
  upShortcut(event: KeyboardEvent) {
    this.setPreviousQuestionAsActual();
  }
  /**
   * Función que captura eventos de tecleo de la flecha de abajo
   * En caso de que el cliente teclee la flecha de abajo se establece la pregunta siguiente como la activa
   */
  @HostListener('document:keyup.arrowDown', ['$event'])
  downShortcut(event: KeyboardEvent) {
    this.setNextQuestionAsActual();
  }
  /**
   * Función que revisa el formulario y manda la nota adquirida al componente padre
   */
  finishNoteForm(){
    let note_aux = {
      title: this.note_form.value.title,
      text: this.note_form.value.text
    };
    this.closeModal(note_aux);
  }
  /**
   * Función que establece cual es la pregunta activa
   * @param question_number Número de la pregunta a establecer como activa
   */
  setActualQuestion(question_number){
    this.actual_question_index = question_number;
  }
  /**
   * Función que establece la pregunta previa como activa
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
   * Función que regresa el nombre de la pregunta activa actualmente
   * @return Cadena que representa el nombre de la pregunta activa
   */
  getQuestionName(){
    return 'question_' + this.actual_question_index;
  }
}