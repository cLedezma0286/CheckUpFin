import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environment/environment';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(environment.PRODUCTS_URL);
  }
}