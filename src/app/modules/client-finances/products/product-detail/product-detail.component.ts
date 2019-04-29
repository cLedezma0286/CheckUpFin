import { Component } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'product-detail',
  templateUrl: 'product-detail.view.html',
  styleUrls: ['product-detail.style.scss']
})

export class ProductDetailComponent{
  product;

  /**
   * Constructor que inicializa el componente del detalle del producto
   * @param productService Servicio del producto.
   */
  constructor(productService: ProductsService){
    this.product = productService.getCurrentProduct();
  }
}