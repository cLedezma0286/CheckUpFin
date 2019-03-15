import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {
  currentProduct;

  constructor(private http: HttpClient) { }

  getCurrentProduct() {
    return this.currentProduct;
  }

  setCurrentProduct(value) {
    this.currentProduct = value;
  }

  getProducts() {
    return this.http.get(environment.PRODUCTS_URL);
  }

  getProduct(idProduct) {
    return this.http.get(environment.PRODUCTS_URL + "/" + idProduct);
  }

  getObjetives(interviewId) {
    return this.http.get(environment.INTERVIEWS_URL + "/" + interviewId + '/objetivos');
  }

  getCurrentProducts(clientId) {
    return this.http.get(environment.CLIENTS_URL + "/" + clientId + '/productos');
  }

  putProducts(clientId, params) {
    return this.http.put(environment.CLIENTS_URL + "/" + clientId + '/productos', params);
  }
}