import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { QuestionsService } from '@services/questions.service';
import { InterviewService } from '@services/interview.service';
declare var jsCalendar: any;
@Component({
  selector: 'interview',
  templateUrl: 'interview.view.html',
  styleUrls: ['interview.style.scss']
})
export class InterviewComponent implements OnInit{
  interview: FormGroup = this.fb.group({});
  interview_id = null;
  questions = [];
  active_question_id = null;
  interval: any;
  actual_question_five_value = null;
  actual_iterations_of_block_two = 0;
  actual_question_45_value = null;
  actual_credits_selected = [];
  first_time_with_credits = true;
  actual_question_67_value = null;
  question_72_previous = [];
  first_time_with_currency = true;
  add_objective_modal_open = false;
  objectives = [];
  add_note_modal_open = false;
  notes = [];
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public questionsService: QuestionsService,
    public interviewService: InterviewService, 
    public fb: FormBuilder,
    @Inject(DOCUMENT) document){}
  ngOnInit(){
    this.route.queryParams.subscribe(
      params => {
        this.interview_id = params['id'];
        this.questionsService.getQuestions().subscribe(
          response => {
            let form_aux = {};
            for (var i = 0; i < response['preguntas'].length; i++) {
              form_aux['question_' + (i + 1)] = ['', []];
            }
            this.interview = this.fb.group(form_aux);
            this.questions = response['preguntas'];
            let question_with_block_index = null;
            for (var i = 0; i < this.questions.length; i++) {
              if (i > 0) {
                this.questions[i]['des_prev_preg'] = this.questions[i - 1].num_pregunta_id;
              } else {
                this.questions[i]['des_prev_preg'] = 1;
              }
              if (this.questions[i].des_opciones.length !== 0 || this.questions[i].tipo_fecha === 1){
                this.questions[i]['focused'] = -1;
                this.questions[i]['selected'] = [];
                if (this.questions[i].tipo_fecha === 1) {
                  this.questions[i].des_opciones = [
                    {
                      des_sig_preg: this.questions[i].des_sig_preg,
                      nombre: 'Mes',
                      Valor: 'Mes'
                    },
                    {
                      des_sig_preg: this.questions[i].des_sig_preg,
                      nombre: 'Año',
                      Valor: 'Año'
                    }
                  ];
                }
              }
              if (!Array.isArray(this.questions[i].des_bloc_preg)) {
                if (!question_with_block_index) {
                  question_with_block_index = (i - 1);
                  this.questions[question_with_block_index]['has_block'] = true;
                  this.questions[question_with_block_index]['block_questions'] = [];
                }
                this.questions[question_with_block_index]['block_questions'].push(this.questions[i]);
                if (Array.isArray(this.questions[i + 1].des_bloc_preg)) {
                  question_with_block_index = null;
                }
              }
            }  
            this.interval = setInterval(()=> {
              if (document.getElementById('question_1')) {
                this.focusQuestion(1);
                if (this.interview_id) {
                  this.interviewService.getInterviewInformation(this.interview_id).subscribe(
                    response => {
                      this.setAnswers(response['respuestas']);
                    },
                    error => {
                      alert('Ha ocurrido un error');
                    }
                  );
                }
                clearInterval(this.interval);
              }
            },100);
          },
          error => {
            alert('Ha ocurrido un error');
          }
        );
      }
    );
  }
  setAnswers(answers){
    for (var i = 0; i < answers.length; i++) {
      let question_aux = this.getQuestionById(answers[i].pregunta_id);
      if (question_aux.bnd_enteros === 1) {
        let answer_value = +answers[i].texto.replace(',','');
        this.interview.controls[this.getQuestionControlName(answers[i].pregunta_id)].setValue(answer_value);
      } else if (question_aux.tipo_fecha === 1) {
        let answer_value = answers[i].texto.split(' ');
        this.interview.controls[this.getQuestionControlName(answers[i].pregunta_id)].setValue(answer_value[0]);
        if (answer_value[1] === 'meses') {
          question_aux.selected.push(0);
        } else if (answer_value[1] === 'años') {
          question_aux.selected.push(0);
        }
      } else if (question_aux.des_opciones.length !== 0 && !Array.isArray(answers[i].texto)) {
        let answer_value = answers[i].texto;
        for (var j = 0; j < question_aux.des_opciones.length; j++) {
          if (question_aux.des_opciones[j].valor === answer_value) {
            question_aux.selected.push(j);
          }
        }
      } else if (question_aux.des_opciones.length !== 0 && Array.isArray(answers[i].texto)) {
        let answer_value = answers[i].texto;
        for (var j = 0; j < question_aux.des_opciones.length; j++) {
          for (var k = 0; k < answer_value.length; k++) {
            if (question_aux.des_opciones[j].valor === answer_value[k]) {
              question_aux.selected.push(j);
            }
          }
        }
      } else {
        this.interview.controls[this.getQuestionControlName(answers[i].pregunta_id)].setValue(answers[i].texto);
      }
    }
  }
  getActualQuestion(){
    for (var i = 0; i < this.questions.length; i++) {
      if (this.questions[i].num_pregunta_id === this.active_question_id) {
        return this.questions[i];
      }
    }
  }
  getNextQuestion(){
    for (var i = 0; i < this.questions.length; i++) {
      if (this.questions[i].num_pregunta_id === this.active_question_id) {
        return this.questions[i + 1];
      }
    }
  }
  getQuestionById(question_id){
    for (var i = 0; i < this.questions.length; i++) {
      if (this.questions[i].num_pregunta_id === question_id) {
        return this.questions[i];
      }
    }
    return null;
  }
  getPositionById(question_id){
    for (var i = 0; i < this.questions.length; i++) {
      if (this.questions[i].num_pregunta_id === question_id) {
        return i;
      }
    }
    return null;
  }
  isQuestionWithOptionsAnswered(question){
    return question.selected.length !== 0;
  }
  isQuestionAnswered(question){
    if (this.interview.value[this.getQuestionControlName(question.num_pregunta_id)]) {
      return true;
    }
    return false;
  }
  getQuestionControlName(question_id){
    return 'question_' + question_id;
  }
  getSelectedValue(question){
    return question.des_opciones[question.selected[0]].valor;
  }
  isOfOptions(question){
    return !isNaN(question.selected);
  }
  isAnswerInTheOptions(answer, options){
    return options.indexOf(answer) !== -1;
  }
  isActualQuestionsTheLastone(){
    return this.questions[(this.questions.length - 1)].num_pregunta_id === this.active_question_id;
  }
  focusQuestion(question_id){
    document.getElementById('question_' + question_id).focus();
  }
  setActiveQuestion(question_id, option?){
    this.active_question_id = question_id;
    if (option || option === 0) {
      for (var i = 0; i < this.questions.length; i++) {
        if (question_id === this.questions[i].num_pregunta_id) {
          this.questions[i].focused = option;
          document.getElementById('content').scrollTop = document.getElementById('question_container_' + question_id).offsetTop - 188;
          return;
        }
      }
    }
    document.getElementById('content').scrollTop = document.getElementById('question_container_' + question_id).offsetTop - 188;
  }
  selectOptionByClick(question_id, option){
    this.setActiveQuestion(question_id, option);
    this.setActualOptionAsSelected();
  }
  setPreviousQuestionAsActive(){
    for (var i = 0; i < this.questions.length; i++) {
      if (this.questions[i].num_pregunta_id === this.active_question_id) {
        this.active_question_id = this.questions[i].des_prev_preg;
        this.focusQuestion(this.active_question_id);
        return;
      }
    }
  }
  setNextQuestionAsActive(){
    if (this.isActualQuestionsTheLastone()){
      return;
    }
    let actual_question = this.getActualQuestion();
    let next_question = null;
    let required_question = null;
    if ((typeof actual_question.des_sig_preg) === 'string') {
      this.active_question_id = actual_question.des_sig_preg;
      this.focusQuestion(this.active_question_id);
      return;
    }
    if (Array.isArray(actual_question.des_sig_preg)) { //Revisar si el atributo des_sig_preg es un arreglo o un número
      for (var i = 0; i < actual_question.des_sig_preg.length; i++) {
        required_question = this.getQuestionById(actual_question.des_sig_preg[i].preg_req[0]);
        if (this.isOfOptions(required_question)) { //Revisar si la pregunta requerida es de opciones
          if (this.isQuestionWithOptionsAnswered(required_question)) {
            if (this.isAnswerInTheOptions(this.getSelectedValue(required_question), actual_question.des_sig_preg[i].opc_seleccionada)) {
              this.active_question_id = actual_question.des_sig_preg[i].siguiente;
              this.focusQuestion(this.active_question_id);
              return;
            }
          }
        } else {
          if (this.isQuestionAnswered(required_question.num_pregunta_id)) { //En caso de que la pregunta requerida no sea de opciones revisar que ya haya sido contestada
            this.active_question_id = required_question.des_sig_preg;
            this.focusQuestion(this.active_question_id);
            return;
          }
        }
      }
      next_question = this.getNextQuestion();
      this.active_question_id = next_question.num_pregunta_id;
      this.focusQuestion(this.active_question_id);
      return;
    } else {
      if (actual_question.des_sig_preg === 0) { //En caso de que des_sig_preg sea 0 la pregunta es de opciones
        if (this.isQuestionWithOptionsAnswered(actual_question)) { //Revisamos que la pregunta actual ya tenga algún valor seleccionado
          for (var i = 0; i < actual_question.des_opciones.length; i++) { // Recorremos las opciones
            if (Array.isArray(actual_question.des_opciones[i].des_sig_preg)) { //Checamos si la opción de la iteración actual tiene el atributo des_sig_preg como un arreglo o un número
              for (var j = 0; j < actual_question.des_opciones[i].des_sig_preg.length; j++) {
                required_question = this.getQuestionById(actual_question.des_opciones[i].des_sig_preg[j].preg_req[0]);
                if (this.isQuestionWithOptionsAnswered(required_question)) {
                  if (this.isAnswerInTheOptions(this.getSelectedValue(required_question), actual_question.des_opciones[i].des_sig_preg[j].opc_seleccionada)) {
                    this.active_question_id = actual_question.des_opciones[i].des_sig_preg[j].siguiente;
                    this.focusQuestion(this.active_question_id);
                    return;
                  }
                }
              }
              // En caso de que ninguna de las respuestas requeridas haya sido contestada asignamos la siguiente comopregunta de la lista como la activa
              next_question = this.getNextQuestion();
              this.active_question_id = next_question.num_pregunta_id;
              this.focusQuestion(this.active_question_id);
            } else {
              if (actual_question.des_opciones[actual_question.selected[0]].valor === actual_question.des_opciones[i].valor) { //Checamos que si la opción de la iteración actual es la opción seleccionada.
                this.active_question_id = actual_question.des_opciones[i].des_sig_preg;
                this.focusQuestion(this.active_question_id);
                return;
              }
            }
          }
        } else { //En caso de que no haya opción seleccionada se considera la siguiente pregunta como la activa
          next_question = this.getNextQuestion();
          this.active_question_id = next_question.num_pregunta_id;
          this.focusQuestion(this.active_question_id);
          return;
        }
      } else { //En caso de que des_sig_preg sea un número diferente de 0 entonces ese valor es el id de la siguiente pregunta 
        this.active_question_id = actual_question.des_sig_preg;
        this.focusQuestion(this.active_question_id);
        return;
      }
    }
  }
  setNextOptionAsFocused(selection_start?){
    for (var i = 0; i < this.questions.length; i++) {
      if (this.active_question_id === this.questions[i].num_pregunta_id) {
        if (this.questions[i].tipo_fecha === 1) {
          let characters_quantity = this.interview.value[this.getQuestionControlName(this.questions[i].num_pregunta_id)].length;
          if (characters_quantity === selection_start) {
            if (this.questions[i].focused === -1) {
              this.focusQuestion('date_' + this.questions[i].num_pregunta_id);
              return;
            }
          }
        }
        if (this.questions[i].des_opciones.length !== 0) {
          if (this.questions[i].focused < (this.questions[i].des_opciones.length - 1)) {
            if (this.questions[i].tipo_fecha === 1) {
              if (this.questions[i].focused !== -1) {
                this.questions[i].focused = this.questions[i].focused + 1;
                return;
              }
            }else {
              this.questions[i].focused = this.questions[i].focused + 1;
              return;
            }
          }
        }
      }
    }
  }
  setPreviousOptionAsFocused(){
    for (var i = 0; i < this.questions.length; i++) {
      if (this.active_question_id === this.questions[i].num_pregunta_id) {
        if (this.questions[i].des_opciones.length !== 0) {
          if (this.questions[i].focused > 0) {
            if (this.questions[i].tipo_fecha === 1) {
              if (this.questions[i].focused !== -1) {
                this.questions[i].focused = this.questions[i].focused - 1;
                return;
              }
            }else {
              this.questions[i].focused = this.questions[i].focused - 1;
              return;
            }
          } else if (this.questions[i].focused === 0) {
            this.focusQuestion(this.questions[i].num_pregunta_id);
            return;
          }
        }
      }
    }
  }
  setActualOptionAsSelected(){
    let actual_question = this.getActualQuestion();
    if (actual_question.des_opciones.length !== 0) {
      if (actual_question.bnd_op_mult === 0) { //La pregunta no es de multiples opciones
        actual_question.selected = [];
        actual_question.selected.push(actual_question.focused);
        if (actual_question.num_pregunta_id === 20) {
          this.throwSpecialCase(20);
        } else {
          //this.setNextQuestionAsActive();
        }
        return;
      } else { //Se pueden escoger varias opciones
        if (actual_question.selected.indexOf(actual_question.focused) !== -1) {
          for (var i = 0; i < actual_question.selected.length; i++) {
            if (actual_question.selected[i] === actual_question.focused) {
              actual_question.selected.splice(i, 1);
              if (actual_question.num_pregunta_id === 60) {
                this.throwSpecialCase(60);
              }
              if (actual_question.num_pregunta_id === 72) {
                this.throwSpecialCase(72);
              }
              return;
            }
          }
        } else {
          actual_question.selected.push(actual_question.focused);
          if (actual_question.num_pregunta_id === 60) {
            this.throwSpecialCase(60);
          }
          if (actual_question.num_pregunta_id === 72) {
            this.throwSpecialCase(72);
          }
          if (actual_question.num_pregunta_id === 27) {
            if (actual_question.focused === 5) {
              actual_question.selected = [5];
            } else if (actual_question.selected.indexOf(5) !== -1) {
              actual_question.selected.splice(actual_question.selected.indexOf(5), 1);
            }
          }
          if (actual_question.num_pregunta_id === 50) {
            if (actual_question.focused === 4) {
              actual_question.selected = [4];
            } else if (actual_question.selected.indexOf(4) !== -1) {
              actual_question.selected.splice(actual_question.selected.indexOf(4), 1);
            }
          }
          return;
        }
      }
    }
  }
  validateValue(question){
    if (question.bnd_enteros) {
      let reg = /^\d+$/;
      let input_value = this.interview.value[this.getQuestionControlName(question.num_pregunta_id)];
      if (!reg.test(input_value)) {
        this.interview.controls[this.getQuestionControlName(question.num_pregunta_id)].setValue(input_value.replace(/\D/g,''));
      }
      if (input_value.length >= 3 && (question.num_pregunta_id === 5 || question.num_pregunta_id === 45 || question.num_pregunta_id === 67)) {
        this.interview.controls[this.getQuestionControlName(question.num_pregunta_id)].setValue(input_value.substring(0,2));
      }
    }
    if (question.num_pregunta_id === 5) {
      this.throwSpecialCase(5);
    }
    if (question.num_pregunta_id === 45) {
      this.throwSpecialCase(45);
    }
    if (question.num_pregunta_id === 67) {
      this.throwSpecialCase(67);
    }
  }
  throwSpecialCase(question_id){
    switch (question_id) {
      case 5:
        this.throwSpecialCaseForQuestion5();
        break;
      case 20:
        this.throwSpecialCaseForQuestion20();
        break;
      case 45:
        this.throwSpecialCaseForQuestion45();
        break;
      case 60:
        this.throwSpecialCaseForQuestion60();
        break;
      case 67:
        this.throwSpecialCaseForQuestion67();
        break;
      case 72:
        this.throwSpecialCaseForQuestion72();
        break;
      default:
        break;
    }
  }
  throwSpecialCaseForQuestion5(){
    if (this.actual_question_five_value === null) {
      this.questions.splice(5,1);
    }
    let question_value = +this.interview.value[this.getQuestionControlName(5)];
    if (question_value > +this.actual_question_five_value) {
      let difference = question_value - +this.actual_question_five_value;
      for (var i = 1; i <= difference; i++) {
        let question_six_aux = {
          bnd_enteros: this.questions[4].block_questions[0].bnd_enteros,
          bnd_op_mult: this.questions[4].block_questions[0].bnd_op_mult,
          created_at: this.questions[4].block_questions[0].created_at,
          des_bloc_preg: this.questions[4].block_questions[0].des_bloc_preg,
          des_categorias: this.questions[4].block_questions[0].des_categorias,
          des_opciones: this.questions[4].block_questions[0].des_opciones,
          des_preg_ref: this.questions[4].block_questions[0].des_preg_ref,
          des_prev_preg: null,
          des_sig_preg: null,
          des_texto: '',
          num_pregunta_id: null,
          tipo_fecha: this.questions[4].block_questions[0].tipo_fecha
        };
        this.interview.addControl(('question_6.' + (+this.actual_question_five_value + i)), new FormControl('', []));
        question_six_aux.num_pregunta_id = '6.' + (+this.actual_question_five_value + i);
        if (i === 1 && +this.actual_question_five_value === 0) {
          question_six_aux.des_prev_preg = 5;
        } else {
          question_six_aux.des_prev_preg = '6.' + ((+this.actual_question_five_value + i) - 1);
        }
        if (+this.actual_question_five_value !== 0) {
          this.questions[4 + +this.actual_question_five_value].des_sig_preg = '6.' + (+this.actual_question_five_value + 1);
        }
        if ((+this.actual_question_five_value + i) === question_value) {
          question_six_aux.des_sig_preg = 7;
        } else {
          question_six_aux.des_sig_preg = '6.' + ((+this.actual_question_five_value + i) + 1);
        }
        question_six_aux.des_texto = '¿Cuántos años tiene tu hijo ' + (i + +this.actual_question_five_value) + '?';
        question_six_aux.num_pregunta_id = '6.' + (+this.actual_question_five_value + i);
        this.questions.splice((4 + (+this.actual_question_five_value + i)), 0, question_six_aux);
      }
      this.questions[4].des_sig_preg = '6.1';
      let question_seven = this.getQuestionById(7);
      question_seven.des_prev_preg = '6.' + question_value;
      this.actual_question_five_value = question_value;
    } else {
      let difference = +this.actual_question_five_value - question_value;
      this.questions.splice((5 + question_value), difference);
      let last_question_of_cycle_index = 4 + question_value;
      this.questions[last_question_of_cycle_index].des_sig_preg = 7;
      let question_seven = this.getQuestionById(7);
      if (question_value) {
        question_seven.des_prev_preg = '6.' + (question_value);
      }else {
        question_seven.des_prev_preg = 5;
      }
    }
    this.actual_question_five_value = +question_value;
  }
  throwSpecialCaseForQuestion20(){
    let question_20 = this.getQuestionById(20);
    let previous_position = null;
    if (question_20.selected[0] === 0) {
      this.actual_iterations_of_block_two = this.actual_iterations_of_block_two + 1;
      this.interview.addControl(('question_17.' + this.actual_iterations_of_block_two), new FormControl('', []));
      this.interview.addControl(('question_18.' + this.actual_iterations_of_block_two), new FormControl('', []));
      this.interview.addControl(('question_19.' + this.actual_iterations_of_block_two), new FormControl('', []));
      let question_17_aux = {
        bnd_enteros: 0,
        bnd_op_mult: 0,
        created_at: '2018-08-20 20:38:52.0',
        des_bloc_preg: 'bloque 2',
        des_categorias: ['Objetivo'],
        des_opciones: [],
        des_preg_ref: '',
        des_prev_preg: null,
        des_sig_preg: ('18.' + this.actual_iterations_of_block_two),
        des_texto: '¿Cuál es tu plan?',
        num_pregunta_id: '17.' + this.actual_iterations_of_block_two,
        tipo_fecha: 0
      }
      if (this.actual_iterations_of_block_two === 1) {
        question_17_aux.des_prev_preg = 19;
        let regular_question_19_aux = this.getQuestionById(19);
        regular_question_19_aux.des_sig_preg = '17.1';
      } else {
        question_17_aux.des_prev_preg = '19.' + (this.actual_iterations_of_block_two - 1);
        let question_29_prev = this.getQuestionById(('19.' + (this.actual_iterations_of_block_two - 1)));
        question_29_prev.des_sig_preg = '17.' + this.actual_iterations_of_block_two;
      }
      previous_position = this.getPositionById(20);
      this.questions.splice(previous_position, 0, question_17_aux);
      let question_18_aux = {
        bnd_enteros: 0,
        bnd_op_mult: 0,
        created_at: '2018-08-20 20:38:52.0',
        des_bloc_preg: 'bloque 2',
        des_categorias: ['Objetivo'],
        des_opciones: [
          {Valor: 'Mes', des_sig_preg: ('19.' + this.actual_iterations_of_block_two), nombre: 'Mes'},
          {Valor: 'Año', des_sig_preg: ('19.' + this.actual_iterations_of_block_two), nombre: 'Año'}
        ],
        des_preg_ref: '',
        des_prev_preg: ('17.' + this.actual_iterations_of_block_two),
        des_sig_preg: ('19.' + this.actual_iterations_of_block_two),
        des_texto: '¿Cuándo te gustaría conseguirlo?',
        num_pregunta_id: '18.' + this.actual_iterations_of_block_two,
        selected: [],
        tipo_fecha: 1
      }
      previous_position = this.getPositionById(20);
      this.questions.splice(previous_position, 0, question_18_aux);
      let question_19_aux = {
        bnd_enteros: 1,
        bnd_op_mult: 0,
        created_at: '2018-08-20 20:38:52.0',
        des_bloc_preg: 'bloque 2',
        des_categorias: ['Objetivo'],
        des_opciones: [],
        des_preg_ref: '',
        des_prev_preg: ('18.' + this.actual_iterations_of_block_two),
        des_sig_preg: 20,
        des_texto: '¿Cuánto estimas que necesitas?',
        num_pregunta_id: '19.' + this.actual_iterations_of_block_two,
        tipo_fecha: 0
      }
      previous_position = this.getPositionById(20);
      this.questions.splice(previous_position, 0, question_19_aux);
      let question_20_aux = this.getQuestionById(20);
      question_20_aux.des_prev_preg = '19.' + this.actual_iterations_of_block_two;
      this.active_question_id = '17.' + this.actual_iterations_of_block_two;
      this.interval = setInterval(()=> {
        if (document.getElementById(('question_17.' + this.actual_iterations_of_block_two))) {
          this.focusQuestion(('17.' + this.actual_iterations_of_block_two));
          clearInterval(this.interval);
        }
      },100);
    } else {
      this.setNextQuestionAsActive();
    }
  }
  throwSpecialCaseForQuestion45(){
    let question_45_aux = this.getQuestionById(45);
    if (this.actual_question_45_value === null) {
      let position_question_46 = this.getPositionById(46);
      this.questions.splice(position_question_46, 2);
    }
    let question_value = +this.interview.value[this.getQuestionControlName(45)];
    let position_question_45 = this.getPositionById(45);
    if (question_value > +this.actual_question_45_value) {
      let difference = question_value - +this.actual_question_45_value;
      for (var i = 1; i <= difference; i++) {
        let question_46_aux = {
          bnd_enteros: question_45_aux.block_questions[0].bnd_enteros,
          bnd_op_mult: question_45_aux.block_questions[0].bnd_op_mult,
          created_at: question_45_aux.block_questions[0].created_at,
          des_bloc_preg: question_45_aux.block_questions[0].des_bloc_preg,
          des_categorias: question_45_aux.block_questions[0].des_categorias,
          des_opciones: question_45_aux.block_questions[0].des_opciones,
          des_preg_ref: question_45_aux.block_questions[0].des_preg_ref,
          des_prev_preg: null,
          des_sig_preg: null,
          des_texto: '',
          num_pregunta_id: null,
          tipo_fecha: question_45_aux.block_questions[0].tipo_fecha,
          focused: question_45_aux.block_questions[0].focused,
          selected: []
        };
        let question_47_aux = {
          bnd_enteros: question_45_aux.block_questions[1].bnd_enteros,
          bnd_op_mult: question_45_aux.block_questions[1].bnd_op_mult,
          created_at: question_45_aux.block_questions[1].created_at,
          des_bloc_preg: question_45_aux.block_questions[1].des_bloc_preg,
          des_categorias: question_45_aux.block_questions[1].des_categorias,
          des_opciones: question_45_aux.block_questions[1].des_opciones,
          des_preg_ref: question_45_aux.block_questions[1].des_preg_ref,
          des_prev_preg: null,
          des_sig_preg: null,
          des_texto: '',
          num_pregunta_id: null,
          tipo_fecha: question_45_aux.block_questions[1].tipo_fecha
        };
        this.interview.addControl(('question_46.' + (+this.actual_question_45_value + i)), new FormControl('', []));
        this.interview.addControl(('question_47.' + (+this.actual_question_45_value + i)), new FormControl('', []));
        question_46_aux.num_pregunta_id = '46.' + (+this.actual_question_45_value + i);
        question_47_aux.num_pregunta_id = '47.' + (+this.actual_question_45_value + i);
        if (i === 1 && +this.actual_question_45_value === 0) {
          question_46_aux.des_prev_preg = 45;
          question_47_aux.des_prev_preg = '46.1';
        } else {
          question_46_aux.des_prev_preg = '47.' + ((+this.actual_question_45_value + i) - 1);
          question_47_aux.des_prev_preg = '46.' + ((+this.actual_question_45_value + i));
        }
        if (+this.actual_question_45_value !== 0) {
          let actual_last_question = this.getQuestionById(('47.' + this.actual_question_45_value));
          actual_last_question.des_sig_preg = '46.' + (+this.actual_question_45_value + 1);
        }
        if ((+this.actual_question_45_value + i) === question_value) {
          question_47_aux.des_sig_preg = 48;
        } else {
          question_47_aux.des_sig_preg = '46.' + ((+this.actual_question_45_value + i) + 1);
        }
        question_46_aux.des_sig_preg = '47.' + (+this.actual_question_45_value + i);
        question_46_aux.des_texto = '¿En qué banco tienes tu tarjeta ' + (i + +this.actual_question_45_value) + '?';
        question_47_aux.des_texto = '¿Y cuál es el límite de esta tarjeta ' + (i + +this.actual_question_45_value) + '?';

        question_46_aux.num_pregunta_id = '46.' + (+this.actual_question_45_value + i);
        question_47_aux.num_pregunta_id = '47.' + (+this.actual_question_45_value + i);

        this.questions.splice((position_question_45 + ((+this.actual_question_45_value * 2) + (i * 2) - 1)), 0, question_46_aux);
        this.questions.splice((position_question_45 + ((+this.actual_question_45_value * 2) + (i * 2))), 0, question_47_aux);
      }
      question_45_aux.des_sig_preg = '46.1';
      let question_48 = this.getQuestionById(48);
      question_48.des_prev_preg = '47.' + question_value;
      this.actual_question_45_value = question_value;
    } else {
      let difference = +this.actual_question_45_value - question_value;
      this.questions.splice((position_question_45 + (question_value * 2) + 1), (difference * 2));
      let last_question_of_cycle_index = position_question_45 + (question_value * 2);
      this.questions[last_question_of_cycle_index].des_sig_preg = 48;
      let question_48 = this.getQuestionById(48);
      if (question_value) {
        question_48.des_prev_preg = '47.' + (question_value);
      }else {
        question_48.des_prev_preg = 45;
      }
    }
    this.actual_question_45_value = +question_value;
  }
  throwSpecialCaseForQuestion60(){
    let question_60 = this.getQuestionById(60);
    if (this.first_time_with_credits) {
      let question_61_position = this.getPositionById(61);
      this.questions.splice(question_61_position, 2);
      this.first_time_with_credits = false;
    }
    let selected_element = this.arrDiff(question_60.selected, this.actual_credits_selected)[0];
    // if (selected_element === '0') {
    //   question_60.selected = [0];
    // } else if (question_60.selected.includes(0)) {
    //   for (var i = 0; i < question_60.selected.length; i++) {
    //     if (question_60.selected[i] === 0) {
    //       question_60.selected.splice(i, 1);
    //     }
    //   }
    // }
    let actual_question_60 = this.getQuestionById(60);
    let quantity_of_selected_items = actual_question_60.selected.length;
    if (quantity_of_selected_items > this.actual_credits_selected.length) {
      let question_61_aux = {
        bnd_enteros: actual_question_60.block_questions[0].bnd_enteros,
        bnd_op_mult: actual_question_60.block_questions[0].bnd_op_mult,
        created_at: actual_question_60.block_questions[0].created_at,
        des_bloc_preg: actual_question_60.block_questions[0].des_bloc_preg,
        des_categorias: actual_question_60.block_questions[0].des_categorias,
        des_opciones: actual_question_60.block_questions[0].des_opciones,
        des_preg_ref: actual_question_60.block_questions[0].des_preg_ref,
        des_prev_preg: null,
        des_sig_preg: null,
        des_texto: '',
        num_pregunta_id: null,
        tipo_fecha: actual_question_60.block_questions[0].tipo_fecha,
        focused: actual_question_60.block_questions[0].focused,
        selected: []
      };
      let question_62_aux = {
        bnd_enteros: actual_question_60.block_questions[1].bnd_enteros,
        bnd_op_mult: actual_question_60.block_questions[1].bnd_op_mult,
        created_at: actual_question_60.block_questions[1].created_at,
        des_bloc_preg: actual_question_60.block_questions[1].des_bloc_preg,
        des_categorias: actual_question_60.block_questions[1].des_categorias,
        des_opciones: actual_question_60.block_questions[1].des_opciones,
        des_preg_ref: actual_question_60.block_questions[1].des_preg_ref,
        des_prev_preg: null,
        des_sig_preg: null,
        des_texto: '',
        num_pregunta_id: null,
        tipo_fecha: actual_question_60.block_questions[1].tipo_fecha,
        focused: actual_question_60.block_questions[0].focused,
        selected: []
      };
      this.interview.addControl(('question_61.' + quantity_of_selected_items), new FormControl('', []));
      this.interview.addControl(('question_62.' + quantity_of_selected_items), new FormControl('', []));
      question_61_aux.num_pregunta_id = '61.' + quantity_of_selected_items;
      question_62_aux.num_pregunta_id = '62.' + quantity_of_selected_items;
      question_60.des_sig_preg = '61.1';
      let question_63 = this.getQuestionById(63);
      question_63.des_prev_preg = '62.' + quantity_of_selected_items;
      if (this.actual_credits_selected.length === 0) {
        question_61_aux.des_prev_preg = 60;
      } else {
        question_61_aux.des_prev_preg = '62.' + (quantity_of_selected_items - 1);
      }
      question_62_aux.des_prev_preg = '61.' + quantity_of_selected_items;
      if (this.actual_credits_selected.length !== 0) {
        let actual_last_question = this.getQuestionById(('62.' + this.actual_credits_selected.length));
        actual_last_question.des_sig_preg = '61.' + quantity_of_selected_items;
      }
      question_62_aux.des_sig_preg = 63;
      question_61_aux.des_sig_preg = '62.' + quantity_of_selected_items;
      question_61_aux.des_texto = '¿Dónde tienes tu crédito ' + quantity_of_selected_items + '?';
      question_62_aux.des_texto = '¿Cuánto tiempo te falta por pagar tu crédito ' + quantity_of_selected_items + '?';
      question_61_aux.num_pregunta_id = '61.' + quantity_of_selected_items;
      question_62_aux.num_pregunta_id = '62.' + quantity_of_selected_items;
      let actual_60_position = this.getPositionById(60);
      this.questions.splice((actual_60_position + (this.actual_credits_selected.length * 2) + 1), 0, question_61_aux);
      this.questions.splice((actual_60_position + (this.actual_credits_selected.length * 2) + 2), 0, question_62_aux);
    } else {
      let actual_60_position = this.getPositionById(60);
      this.questions.splice((actual_60_position + 1 + (quantity_of_selected_items * 2)), 2);
      if (quantity_of_selected_items){
        let last_question_of_cycle = this.getQuestionById('62.' + quantity_of_selected_items);
        last_question_of_cycle.des_sig_preg = 63;
      } else {
        question_60.des_sig_preg = 63;
      }
      let question_63 = this.getQuestionById(63);
      if (quantity_of_selected_items) {
        question_63.des_prev_preg = '62.' + quantity_of_selected_items;
      }else {
        question_63.des_prev_preg = 60;
      }
    }
    this.actual_credits_selected = JSON.parse(JSON.stringify(question_60.selected));
  }
  throwSpecialCaseForQuestion67(){
    let question_67_position = this.getPositionById(67);
    if (this.actual_question_67_value === null) {
      this.questions.splice((question_67_position + 1),1);
    }
    let question_67_new_value = +this.interview.value[this.getQuestionControlName(67)];
    if (question_67_new_value > +this.actual_question_67_value) {
      let difference = question_67_new_value - +this.actual_question_67_value;
      for (var i = 1; i <= difference; i++) {
        let question_68_aux = {
          bnd_enteros: this.questions[question_67_position].block_questions[0].bnd_enteros,
          bnd_op_mult: this.questions[question_67_position].block_questions[0].bnd_op_mult,
          created_at: this.questions[question_67_position].block_questions[0].created_at,
          des_bloc_preg: this.questions[question_67_position].block_questions[0].des_bloc_preg,
          des_categorias: this.questions[question_67_position].block_questions[0].des_categorias,
          des_opciones: this.questions[question_67_position].block_questions[0].des_opciones,
          des_preg_ref: this.questions[question_67_position].block_questions[0].des_preg_ref,
          des_prev_preg: null,
          des_sig_preg: null,
          des_texto: '',
          num_pregunta_id: null,
          tipo_fecha: this.questions[question_67_position].block_questions[0].tipo_fecha
        };
        this.interview.addControl(('question_68.' + (+this.actual_question_67_value + i)), new FormControl('', []));
        question_68_aux.num_pregunta_id = '68.' + (+this.actual_question_67_value + i);
        if (i === 1 && +this.actual_question_67_value === 0) {
          question_68_aux.des_prev_preg = 67;
        } else {
          question_68_aux.des_prev_preg = '68.' + ((+this.actual_question_67_value + i) - 1);
        }
        if (+this.actual_question_67_value !== 0) {
          this.questions[question_67_position + +this.actual_question_67_value].des_sig_preg = '68.' + (+this.actual_question_67_value + 1);
        }
        if ((+this.actual_question_67_value + i) === question_67_new_value) {
          question_68_aux.des_sig_preg = 69;
        } else {
          question_68_aux.des_sig_preg = '68.' + ((+this.actual_question_67_value + i) + 1);
        }
        question_68_aux.des_texto = '¿Cuánto asciende el valor de tu casa ' + (i + +this.actual_question_67_value) + '?';
        question_68_aux.num_pregunta_id = '68.' + (+this.actual_question_67_value + i);
        this.questions.splice((question_67_position + (+this.actual_question_67_value + i)), 0, question_68_aux);
      }
      this.questions[question_67_position].des_sig_preg = '68.1';
      let question_69 = this.getQuestionById(69);
      question_69.des_prev_preg = '68.' + question_67_new_value;
      this.actual_question_67_value = question_67_new_value;
    } else {
      let difference = +this.actual_question_67_value - question_67_new_value;
      this.questions.splice((question_67_position + 1 + question_67_new_value), difference);
      let last_question_of_cycle_index = question_67_position + question_67_new_value;
      this.questions[last_question_of_cycle_index].des_sig_preg = 69;
      let question_69 = this.getQuestionById(69);
      if (question_67_new_value) {
        question_69.des_prev_preg = '68.' + (question_67_new_value);
      }else {
        question_69.des_prev_preg = 67;
      }
    }
    this.actual_question_67_value = +question_67_new_value;
  }

  throwSpecialCaseForQuestion72(){
    let question_72 = this.getQuestionById(72);
    let question_72_position = this.getPositionById(72);
    let selected_value_array = this.arrDiff(question_72.selected, this.question_72_previous);
    let selected_value = question_72.des_opciones[+selected_value_array[0]].valor;
    let new_quantity_of_items_selected = question_72.selected.length;
    let previous_quantity_of_items_selected = this.question_72_previous.length;
    if (this.first_time_with_currency) {
      let question_73_position = this.getPositionById(73);
      this.questions.splice(question_73_position, 1);
      this.first_time_with_currency = false;
    }
    if (new_quantity_of_items_selected > previous_quantity_of_items_selected) {
      let question_73_aux = {
        bnd_enteros: 1,
        bnd_op_mult: 0,
        created_at: '2018-08-20 20:38:52.0',
        des_bloc_preg: 'bloque 6',
        des_categorias: 'Ahorros e inversiones',
        des_opciones: [],
        des_preg_ref: '72',
        des_prev_preg: null,
        des_sig_preg: 74,
        des_texto: '¿Cuánto tienes en ' + selected_value + '?',
        num_pregunta_id: '73-' + selected_value,
        tipo_fecha: 0
      }
      this.interview.addControl(('question_73-' + selected_value), new FormControl('', []));
      if (previous_quantity_of_items_selected !== 0) {
        this.questions[question_72_position + previous_quantity_of_items_selected].des_sig_preg = '73-' + selected_value;
        question_73_aux.des_prev_preg = this.questions[question_72_position + previous_quantity_of_items_selected].num_pregunta_id;
      } else {
        question_72.des_sig_preg = '73-' + selected_value;
        question_73_aux.des_prev_preg = 72;
      }
      let question_74 = this.getQuestionById(74);
      question_74.des_prev_preg = '73-' + selected_value;
      this.questions.splice((question_72_position + new_quantity_of_items_selected), 0, question_73_aux);
    } else {
      for (var i = 0; i < previous_quantity_of_items_selected; i ++) {
        if (this.question_72_previous[i] !== question_72.selected[i]) {
          let removed_value = question_72.des_opciones[+this.question_72_previous[i]].valor;
          let question_to_delete_position = this.getPositionById(('73-' + removed_value));
          this.questions.splice(question_to_delete_position, 1);
          if (i === 0) {
            if (new_quantity_of_items_selected === 0) {
              question_72.des_sig_preg = 74;
              let question_74 = this.getQuestionById(74);
              question_74.des_prev_preg = 72;
            } else {
              question_72.des_sig_preg = '73-' + question_72.des_opciones[question_72.selected[0]].valor;
              let first_question_73 = this.getQuestionById('73-' + question_72.des_opciones[question_72.selected[0]].valor);
              first_question_73.des_prev_preg = 72;
            }
          } else if (i < (previous_quantity_of_items_selected - 1)) {
            let previous_question = this.getQuestionById(('73-' + question_72.des_opciones[(question_72.selected[(i - 1)])].valor));
            let next_question = this.getQuestionById(('73-' + question_72.des_opciones[question_72.selected[(i)]].valor));
            previous_question.des_sig_preg = '73-' + question_72.des_opciones[question_72.selected[(i)]].valor;
            next_question.des_prev_preg = '73-' + question_72.des_opciones[(question_72.selected[(i - 1)])].valor;
          } else if (i === (previous_quantity_of_items_selected - 1)) {
            if (new_quantity_of_items_selected === 0) {
              question_72.des_sig_preg = 74;
              let question_74 = this.getQuestionById(74);
              question_74.des_prev_preg = 72;
            } else {
              let question_74 = this.getQuestionById(74);
              question_74.des_prev_preg = '73-' + question_72.des_opciones[question_72.selected[(question_72.selected.length - 1)]].valor;
              let last_question_73 = this.getQuestionById('73-' + question_72.des_opciones[question_72.selected[(question_72.selected.length - 1)]].valor);
              last_question_73.des_sig_preg = 74;
            }
          }
          this.question_72_previous = JSON.parse(JSON.stringify(question_72.selected));
          return;
        }
      }
    }
    this.question_72_previous = JSON.parse(JSON.stringify(question_72.selected));
  }
  arrDiff(a1, a2) {
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++) {
      a[a1[i]] = true;
    }
    for (var i = 0; i < a2.length; i++) {
      if (a[a2[i]]) {
          delete a[a2[i]];
      } else {
        a[a2[i]] = true;
      }
    }
    for (var k in a) {
      diff.push(k);
    }
    return diff;
  }
  @HostListener('document:keyup', ['$event'])
  downShortcut(event: KeyboardEvent) {
    if (event.keyCode === 38) { //Up
      this.setPreviousQuestionAsActive();
    }
    if (event.keyCode === 40) { //Down
      this.setNextQuestionAsActive();
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
  openAddObjectiveModal(){
    this.add_objective_modal_open = true;
  }
  closeObjectiveModal(objective){
    if (objective) {
      this.objectives.push(objective);
    }
    this.add_objective_modal_open = false;
  }
  openAddNoteModal(){
    this.add_note_modal_open = true;
  }
  closeNoteModal(note){
    if (note) {
      this.notes.push(note);
    }
    this.add_note_modal_open = false;
  }
  sendInterview(){
    let answers_aux = this.getAnswers();
    let objectives_aux = this.objectives;
    let interview_aux = {
      entrevista: {
        num_clie_cis: 111111111111112,
        sig_checkup: this.getNextCheckUp(),
        respuestas: answers_aux,
        notas: this.getNotes(),
        acuerdos: [],
        objetivos: objectives_aux
      }
    }
    this.router.navigate(['/loading/finance-health']);
    this.interviewService.createInterview(interview_aux).subscribe(
      response => {
        localStorage.setItem('actual_interview_id', JSON.stringify(response['id']));
        this.router.navigate(['/financial-health'], { queryParams: { simple_view: 'true' }});
      },
      error => {
        alert('Ha ocurrido un error');
      }
    );
  }
  getAnswers(){
    let answers_aux = [];
    for (var i = 0; i < this.questions.length; i++){
      let question = this.questions[i];
      let answer = {};
      if (typeof question.num_pregunta_id === 'number') {
        answer['num_pregunta_id'] = question.num_pregunta_id
      } else if (typeof question.num_pregunta_id === 'string') {
        let id_element = question.num_pregunta_id.split('.')[0];
        answer['num_pregunta_id'] = +id_element;
        answer['sub_id'] = question.num_pregunta_id;
      }
      if (question.selected !== undefined && question.tipo_fecha !== 1 && question.bnd_op_mult === 0) { //Preguntas que son de opciones, que no son fecha, que pueden solo seleccionar una opción
        if (question.selected.length !== 0) {
          answer['texto'] = question.des_opciones[question.selected[0]].valor;
          answers_aux.push(answer);
        }
      } else if (question.selected !== undefined && question.tipo_fecha !== 1 && question.bnd_op_mult === 1) { //Preguntas que son de opciones, que no son fecha, se pueden seleccionar multiples opciones
        if (question.selected.length !== 0) {
          let choosed_options = [];
          for (var j = 0; j < question.selected.length; j++) {
            choosed_options.push(question.des_opciones[question.selected[j]].valor);
          }
          answer['texto'] = choosed_options;
          answers_aux.push(answer);
        }
      } else if (question.selected !== undefined && question.tipo_fecha === 1) { //Preguntas de tipo fecha
        let control_value = this.interview.value[this.getQuestionControlName(question.num_pregunta_id)];
        if (question.selected.length !== 0 && control_value) {
          let date_type = '';
          if (question.selected[0] === 0) {
            date_type = 'meses'
          } else if (question.selected[0] === 1) {
            date_type = 'años';
          }
          answer['texto'] = control_value + ' ' + date_type;
          answers_aux.push(answer);
        }
      } else {
        if (this.interview.value[this.getQuestionControlName(question.num_pregunta_id)]) {
          answer['texto'] = this.interview.value[this.getQuestionControlName(question.num_pregunta_id)];
          answers_aux.push(answer);
        }
      }
    }
    return answers_aux;
  }
  getNotes(){
    let notes_aux = [];
    for (var i = 0; i < this.notes.length; i++) {
      let note_aux = {
        titulo: this.notes[i].title,
        descripcion: this.notes[i].text,
        tipo_nota: 'nota',
        num_clie_cis: 1
      }
      notes_aux.push(note_aux);
    }
    return notes_aux;
  }
  getNextCheckUp(){
    let today = new Date();
    today.setMonth(today.getMonth()+6);
    return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  }
  getDesTexto(question){
    if (question.num_pregunta_id === 22) {
      if (this.interview.value[this.getQuestionControlName(21)]) {
        return question.des_texto.replace('_',this.interview.value[this.getQuestionControlName(21)]);
      }
    }
    return question.des_texto;
  }
}