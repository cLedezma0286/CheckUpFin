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
  constructor(public fb: FormBuilder){}
  ngOnInit(){
    this['question_0'].nativeElement.focus();
  }
  closeModal(note){
    this.close.emit(note);
  }
  // @HostListener('document:keyup.arrowUp', ['$event'])
  // upShortcut(event: KeyboardEvent) {
  //   this.setPreviousQuestionAsActual();
  // }
  // @HostListener('document:keyup.arrowDown', ['$event'])
  // downShortcut(event: KeyboardEvent) {
  //   this.setNextQuestionAsActual();
  // }

  @HostListener('document:keyup', ['$event'])
  downShortcut(event: KeyboardEvent) {
    // console.log('document:keyup', event.keyCode);
    if (event.keyCode === 38 || (event.keyCode === 9 && event.shiftKey)) { //Up
      this.setPreviousQuestionAsActual();
    }
    if (event.keyCode === 40 || (event.keyCode === 9  && !event.shiftKey)) { //Down
      this.setNextQuestionAsActual();
    }
  }

  finishNoteForm(){
    let note_aux = {
      title: this.note_form.value.title,
      text: this.note_form.value.text
    };
    this.closeModal(note_aux);
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
    if (this.actual_question_index < 1) {
      this.actual_question_index = this.actual_question_index + 1;
      this[this.getQuestionName()].nativeElement.focus();
    }
  }
  getQuestionName(){
    return 'question_' + this.actual_question_index;
  }
}