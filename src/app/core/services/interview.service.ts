import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InterviewService{
  constructor(public http: HttpClient){}
  getInterviewInformation(interview_id){
  	return this.http.get(environment.INTERVIEWS_URL + '/' + interview_id);
  }
  getInterviewInvestments(interview_id){
    return this.http.get(environment.INTERVIEWS_URL + '/' + interview_id + '/inversiones');
  }
  createInterview(interview){
    console.log('createInterview', interview);
  	return this.http.post(environment.INTERVIEWS_URL, interview);
  }
  getRecommendedProducts(interview_id){
    return this.http.get(environment.INTERVIEWS_URL + '/' + interview_id + '/productos_recomendados');
  }
}