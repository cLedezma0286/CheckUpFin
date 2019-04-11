import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {
  currentProduct: any;

  constructor(private http: HttpClient) { }

  /**
   * Método para obtener el producto seleccionado en la vista.
   * @returns El producto actual que se muestra en la vista.
   */
  getCurrentProduct() {
    return this.currentProduct;
  }

  /**
   * Método para actualizar el producto seleccionado en la vista.
   * @param value  El que se mostrata en la vista.
   */
  setCurrentProduct(value) {
    this.currentProduct = value;
  }

  /**
   * Petición a servidor para obtener la lista de productos disponibles.
   * @returns Observable de la petición para la lista de productos.
   */
  getProducts() {
    return this.http.get(environment.PRODUCTS_URL);
  }

  /**
   * Petición a servidor para obtener el producto con el id proporcionado.
   * @param idProduct  Id del producto.
   * @returns Observable de la petición para el producto.
   */
  getProduct(idProduct) {
    return this.http.get(environment.PRODUCTS_URL + "/" + idProduct);
  }

  /**
   * Petición a servidor para obtener los objetivos dentro de la entrevista con el id proporcionado.
   * @param interviewId  Id de la entrevista.
   * @returns Observable de la petición para los objetivos.
   */
  getObjetives(interviewId) {
    return this.http.get(environment.INTERVIEWS_URL + "/" + interviewId + '/objetivos');
  }

  /**
   * Petición a servidor para obtener los productos seleccionados por el cliente con el id proporcionado.
   * @param clientId  Id del cliente.
   * @returns Observable de la petición para los productos seleccionados.
   */
  getCurrentProducts(clientId) {
    return this.http.get(environment.CLIENTS_URL + "/" + clientId + '/productos');
  }

  /**
   * Petición a servidor para actualizar los productos seleccionados por el cliente con el id proporcionado.
   * @param clientId  Id del cliente.
   * @param params JSON con la lista de ids de los productos seleccionados.
   * @returns Observable de la petición para actualizar los productos seleccionados.
   */
  putProducts(clientId, params) {
    return this.http.post(environment.CLIENTS_URL + "/" + clientId + '/productos', params);
  }
}