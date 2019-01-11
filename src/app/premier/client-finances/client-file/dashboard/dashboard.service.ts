import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}
  getClientInformation(){
    return this.http.get(environment.CLIENTS_URL + '/1111');
  }
  getInterviewInformation(){
    return this.http.get(environment.CLIENTS_URL + '/1/entrevista');
  }
  getProductsByObjectives(){
  	return this.http.get(environment.CLIENTS_URL + '/1/productos');
  }
}