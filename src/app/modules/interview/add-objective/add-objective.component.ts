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
  constructor(public fb: FormBuilder){}
  ngOnInit(){
    this['question_0'].nativeElement.focus();
  }
  @HostListener('document:keyup.arrowUp', ['$event'])
  upShortcut(event: KeyboardEvent) {
    this.setPreviousQuestionAsActual();
  }
  @HostListener('document:keyup.arrowDown', ['$event'])
  downShortcut(event: KeyboardEvent) {
    this.setNextQuestionAsActual();
  }
  setActualQuestion(question_number){
    this.actual_question_index = question_number;
  }
  setPreviousQuestionAsActual(){
    if (this.actual_question_index > 0) {
      this.actual_question_index = this.actual_question_index - 1;
      this[this.getQuestionName()].nativeElement.focus();
    }
  }
  setNextQuestionAsActual(){
    if (this.actual_question_index < 2) {
      this.actual_question_index = this.actual_question_index + 1;
      this[this.getQuestionName()].nativeElement.focus();
    }
  }
  getQuestionName(){
    return 'question_' + this.actual_question_index;
  }
  setQuestionOneOptionValue(option_value){
    this.question_1_selected_option = option_value;
  }
  closeModal(objective){
    this.close.emit(objective);
  }
  finishObjectiveForm(){
    let objective_aux = {
      nombre: this.objective_form.value.what_objective,
      fecha: (this.objective_form.value.when + ' ' + this.question_1_selected_option),
      valor: this.objective_form.value.how_many
    };
    this.closeModal(objective_aux);
  }
}