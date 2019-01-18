import { Component, OnInit, ViewChild, ElementRef, HostListener, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjectivesService } from '@shared-services/objectives.service';
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
  constructor(public objectivesService: ObjectivesService, public fb: FormBuilder){}
  ngOnInit(){
    this['question_0'].nativeElement.focus();
    if (this.objective) {
      this.loadObjectiveValues();
    }
  }
  loadObjectiveValues(){
    this.objective_form.controls.what_objective.setValue(this.objective.nombre);
    this.objective_form.controls.when.setValue(this.getAmountFromDate(this.objective.fecha));
    this.question_1_selected_option = this.getTypeFromDate(this.objective.fecha);
    this.objective_form.controls.how_many.setValue(this.objective.valor);
  }
  getAmountFromDate(date){
    let date_date_array = date.split(' ');
    let amount_string = '';
    for (var i = 0; i < date_date_array.length - 1; i++) {
      amount_string = amount_string + date_date_array[i] + ' ';
    }
    return amount_string.trim();
  }
  getTypeFromDate(date){
    let date_date_array = date.split(' ');
    return date_date_array[date_date_array.length - 1];
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
      valor: this.objective_form.value.how_many,
      entrevista_id: this.interview_id
    };
    if (this.objective) {
      this.objectivesService.editObjective(objective_aux, this.objective.id).subscribe(
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