import { Component } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'product-detail',
  templateUrl: 'product-detail.view.html',
  styleUrls: ['product-detail.style.scss']
})

export class ProductsComponent{
  product;

  constructor(productService: ProductsService){
    this.product = productService.getCurrentProduct();
  }
}