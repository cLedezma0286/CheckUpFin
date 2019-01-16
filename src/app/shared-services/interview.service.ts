import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
@Injectable({
  providedIn: 'root'
})
export class InterviewService{
  constructor(public http: HttpClient){}
  getInterviewInvestments(interview_id){
    return this.http.get(environment.INTERVIEWS_URL + '/' + interview_id + '/inversiones');
  }
}