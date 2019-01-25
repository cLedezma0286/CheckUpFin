import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QuestionsService{
  constructor(public http: HttpClient){}
  getQuestions(){
    return this.http.get(environment.QUESTIONS_URL);
  }
}