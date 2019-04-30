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

  @HostListener('document:keyup', ['$event'])
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

  setActualQuestion(question_number){
    this.actual_question_index = question_number;
  }
  setPreviousQuestionAsActual(){
    if (this.actual_question_index > 0) {
      this.actual_question_index = this.actual_question_index - 1;
      this[this.getQuestionName()].nativeElement.click();
      setTimeout(() => this[this.getQuestionName()].nativeElement.focus(), 10);
    }
  }
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