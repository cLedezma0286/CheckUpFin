import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ObjectivesService{
  constructor(public http: HttpClient){}
  createObjective(objective){
    return this.http.post(environment.OBJECTIVES_URL, objective);
  }
  editObjective(objective_id, objective){
    return this.http.post(environment.OBJECTIVES_URL + '/' + objective_id, objective);
  }
  deleteObjective(objective_id){
    return this.http.post(environment.OBJECTIVES_URL + '/' + objective_id + '/delete', null);
  }
}