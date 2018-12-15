import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ClientSearchService {

  constructor(private http: HttpClient) {}

  getClientsByCISNumber(cis_number){
    return this.http.get(environment.CLIENTS_URL + '?num_cis_clie=' + cis_number);
  }
}