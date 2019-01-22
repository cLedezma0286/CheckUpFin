import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ClientsService{
  constructor(public http: HttpClient){}
  getClientInformation(client_cis){
  	return this.http.get(environment.CLIENTS_URL + '/' + client_cis);
  }
  getClientInterviewInformation(client_cis){
    return this.http.get(environment.CLIENTS_URL + '/' + client_cis + '/entrevista');
  }
  getClientProducts(client_cis){
  	return this.http.get(environment.CLIENTS_URL + '/' + client_cis + '/productos');
  }
  setClientPersonalInformation(client_information){
    return this.http.put(environment.CLIENTS_URL + '/' + 6454, client_information);
  }
  setNextCheckupClient(client_cis, nextCheckup){
    return this.http.put(environment.CLIENTS_URL + '/' + client_cis + '/siguiente_checkup', nextCheckup);
  }
}