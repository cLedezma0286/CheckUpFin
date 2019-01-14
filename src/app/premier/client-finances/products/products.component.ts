import { Component, Renderer2 } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
  selector: 'products',
  templateUrl: 'products.view.html',
  styleUrls: ['products.style.scss']
})
export class ProductsComponent{
  products = [];
  selectedProducts = [];
  salesDates = [
    {
      key: 'inmediata',
      value: 'Inmediata'
    },
    {
      key: '3-6 months',
      value: '3-6 Meses'
    },
    {
      key: '1 year',
      value: '1 año'
    }
  ];
  currentProduct;
  selectedProduct;
  showSelectedProducts;
  print_modal_open = false;
  constructor(public productsService: ProductsService, public renderer: Renderer2){
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
    };

    return "assets/images/"+
      (images.hasOwnProperty(category) ? images[category] : images['Hogar']);
  }

  showSelected() {
    this.showSelectedProducts = true;
  }

  hideSelected() {
    this.showSelectedProducts = false;
  }

  selectProduct(product) {
    this.selectedProduct = product;
    this.selectedProducts.push(product);
  }

  removeProduct(idProduct) {
    for (var k = 0; k < this.selectedProducts.length; k++) {
      if (idProduct === this.selectedProducts[k].id) {
        this.selectedProducts[k].isAdded = false;
        this.selectedProducts.splice(k,1);
      }
    }
  }

  saveProduct() {
    this.selectedProduct['isAdded'] = true;
    this.selectedProduct = undefined;
  }

  showProductInfo(product) {
    this.productsService.getProduct(product.id)
    .subscribe(data => {
      this.currentProduct = data;
    });
  }

  closeProductModal() {
    if (this.selectedProduct) {
      this.selectedProducts.pop();
    }
    this.currentProduct = undefined;
    this.selectedProduct = undefined;
  }
  openPrintModal(){
    this.setBodyScroll('hidden');
    this.print_modal_open = true;
  }
  closePrintModal(){
    this.print_modal_open = false;
    this.setBodyScroll('auto');
  }
   setBodyScroll(scroll_value){
    this.renderer.setStyle(document.body, 'overflow', scroll_value);
  }
}