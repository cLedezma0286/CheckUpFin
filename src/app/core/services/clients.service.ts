import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClientsService{
  constructor(public http: HttpClient){}
  getClientInformation(client_cis){
    return this.http.get(environment.CLIENTS_URL + '/' + client_cis);
  }
  getClientsMatchByCis(client_cis){
    return this.http.get(environment.CLIENTS_URL + '?num_cis_clie=' + client_cis);
  }
  getClientInterviewInformation(client_cis){
    return this.http.get(environment.CLIENTS_URL + '/' + client_cis + '/entrevista');
  }
  getClientProducts(client_cis){
    return this.http.get(environment.CLIENTS_URL + '/' + client_cis + '/productos');
  }
  setClientPersonalInformation(client_cis, client_information){
    return this.http.post(environment.CLIENTS_URL + '/' + client_cis, client_information);
  }
  setNextCheckupClient(client_cis, nextCheckup){
    return this.http.post(environment.CLIENTS_URL + '/' + client_cis + '/siguiente_checkup', nextCheckup);
  }
  createClient(){
    return this.http.post(environment.CLIENTS_URL, {});
  }
}