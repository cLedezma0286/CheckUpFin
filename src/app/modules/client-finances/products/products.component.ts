import { Component, Renderer2, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { InterviewService } from '@services/interview.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'products',
  templateUrl: 'products.view.html',
  styleUrls: ['products.style.scss']
})
export class ProductsComponent implements OnInit{
  products = [];
  selectedProducts = [];
  productForm = this.fb.group({
    selectedDate: ['']
  });
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
  anySelected = false;
  recommended_products = [];
  objectives;
  constructor(public productsService: ProductsService,
    public interviewService: InterviewService, public renderer: Renderer2,
    public router: Router, public fb: FormBuilder){}

  ngOnInit() {
    let actual_interview_id = JSON.parse(localStorage.getItem('actual_interview_id'));
    this.getProducts();
    this.getRecommendedProducts(actual_interview_id);
    this.getObjectives(actual_interview_id);
    this.getCurrentProducts(actual_interview_id);
  }

  getObjectives(interviewId) {
    this.productsService.getObjetives(interviewId).subscribe(
      data => {
        this.objectives = data['objetivos'];
      },
      error => {
        alert('Ha ocurrido un error');
      }
    );
  }

  getProducts() {
    this.productsService.getProducts().subscribe(
      data => {
        var productos = data['productos'];
        var index = 0, index2 = 0;
        for (let prop in productos) {
          this.products.push([]);
          for (let element in productos[prop]) {
            this.products[index].push(productos[prop][element]);
          }
          index++;
        }
      },
      error => {
        alert('Ha ocurrido un error');
      }
    );
  }

  getRecommendedProducts(interviewId) {
    this.interviewService.getRecommendedProducts(interviewId).subscribe(
      response => {
        var product_categories = response['productos'];
        for (let category in product_categories) {
          for (var i = 0; i < product_categories[category].length; i++) {
            this.recommended_products.push(product_categories[category][i].id);
          }
        }
      },
      error => {
        alert('Ha ocurrido un error');
      }
    );
  }

  getCurrentProducts(interviewId) {
    this.productsService.getCurrentProducts(interviewId).subscribe(
      response => {
        console.log(response);
      },
      error => {
        alert('Ha ocurrido un error');
      }
    );
  }

  getName(category){
    return category + '';
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
    this.selectedProducts['fecha_venta'] = this.productForm.value.selectedDate;
    this.productForm.controls['selectedDate'].setValue('');
    this.selectedProduct['objetivos'] = [];
    for (let objective in this.objectives) {
      if (objective['selected']) {
        this.selectedProduct['objetivos'].push(objective['id']);
      }
      objective['selected'] = false;
    }
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
  goToDashboard(){
    this.router.navigate(['/client-finances/client-file/dashboard']);
  }

  check(currentObjective) {
    currentObjective.selected = !currentObjective.selected;
    this.anySelected = this.objectives.reduce(function(x,y) {
      return x || !!y.selected;
  }, false);
  }
}