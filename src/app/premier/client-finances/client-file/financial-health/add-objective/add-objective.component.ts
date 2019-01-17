import { Component, OnInit, ViewChild, ElementRef, HostListener, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjectivesService } from '@shared-services/objectives.service';
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
  @Input() interview_id: number;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  add_objective: FormGroup = this.fb.group({
    'what_objective': ['', []],
    'when': ['', []],
    'how_many': ['', []],
  });
  constructor(public objectivesService: ObjectivesService, public fb: FormBuilder){}
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
  closeModal(){
    this.close.emit();
  }
  addObjective(){
    let objective_aux = {
      nombre: this.add_objective.value.what_objective,
       fecha: (this.add_objective.value.when + ' ' + this.question_1_selected_option),
       valor: this.add_objective.value.how_many,
       entrevista_id: this.interview_id
    };
    this.objectivesService.createObjective(objective_aux).subscribe(
      response => {
        this.closeModal();
      },
      error => {
        alert('Ha ocurrido un error');
      }
    );
  }
}