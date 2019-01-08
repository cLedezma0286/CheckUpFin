import { Component } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
  selector: 'products',
  templateUrl: 'products.view.html',
  styleUrls: ['products.style.scss']
})
export class ProductsComponent{
  products = [];
  currentProduct;

  constructor(public productsService: ProductsService){
    productsService.getProducts()
    .subscribe(data => {
      var productos = data['productos'];
      var index = 0, index2 = 0;
      for (let prop in productos) {
        this.products.push([]);
        for (let element in productos[prop]) {
          this.products[index].push(productos[prop][element]);
        }
        index++;
      }
    });
  }

  getImagenByCategory(category){
    var images = {
      "Estilo de vida": "dinero.png",
      "Hogar": "hogar.png",
      "Protección de Patrimonio": "inversion.png"
      // seguro.png, tarjeta.png
    };

    return "assets/images/"+
      (images.hasOwnProperty(category) ? images[category] : images['Hogar']);
  }

  showProductInfo(product) {
    this.productsService.getProduct(product.id)
    .subscribe(data => {
      this.currentProduct = data;
    });
  }

  closeProductModal() {
    this.currentProduct = undefined;
  }
}