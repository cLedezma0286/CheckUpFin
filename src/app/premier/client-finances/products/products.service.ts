import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environment/environment';

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
    return this.http.get(environment.PRODUCTS_URL2 + "/" + idProduct);
  }
}