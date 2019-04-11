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
  now;
  day;
  month;
  year;
  salesDates;
  currentProduct;
  selectedProduct;
  showSelectedProducts;
  print_modal_open = false;
  anySelected = false;
  recommended_products = [];
  objectives;

  /**
   * Constructor del componente de productos.
   * @param productsService Servicio de productos
   * @param interviewService Servicio de la entrevista
   * @param renderer Servicio de manejo de estilos de vista.
   * @param router Servicio de manejo de rutas
   * @param fb Servicio para manejar forms.
   */
  constructor(public productsService: ProductsService,
    public interviewService: InterviewService, public renderer: Renderer2,
    public router: Router, public fb: FormBuilder){}

  /**
   * Función inicializa los elementos de la vista.
   */
  ngOnInit() {
    this.now = new Date();
    this.day = this.now.getDate();
    this.month = this.now.getMonth();
    this.year = this.now.getFullYear();
    this.salesDates = [
      {
        key: this.formateDate(this.now),
        value: 'Inmediata'
      },
      {
        key: this.formateDate(new Date(this.year, this.month + 3, this.day)),
        value: '3-6 Meses'
      },
      {
        key: this.formateDate(new Date(this.year + 1, this.month, this.day)),
        value: '1 año'
      }
    ];
    let actual_interview_id = JSON.parse(localStorage.getItem('actual_interview_id'));
    this.getProducts();
    this.getRecommendedProducts(actual_interview_id);
    this.getObjectives(actual_interview_id);
  }

  /**
   * Función para mandar la petición de obtener los objetivos de la entrevista.
   * @param interviewId Id de la entrevista.
   */  
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

  /**
   * Función par mandar la petición de obtener la lista de productos.
   */
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
        let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
        this.getCurrentProducts(client_cis);
      },
      error => {
        alert('Ha ocurrido un error');
      }
    );
  }

  /**
   * Función para mandar la petición de obtener la lista de productos recomendados de acuerdo a su entrevista.
   * @param interviewId Id de la entrevista
   */
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

  /**
   * Función para mandar la petición de obtener la lista de productos seleccionados por el cliente.
   * @param interviewId Id de la entrevista
   */
  getCurrentProducts(interviewId) {
    this.productsService.getCurrentProducts(interviewId).subscribe(
      response => {
        this.selectedProducts = [];
        for (var k = 0; k < response['productos'].length; k++) {
          for(var a = 0; a < this.products.length; a++) {
            for(var b = 0; b < this.products[a].length; b++) {
              if (response['productos'][k].producto.id === this.products[a][b].id) {
                this.products[a][b] = response['productos'][k].producto;
                this.products[a][b].isAdded = true;
                break;
              }
            }
          }
          this.selectedProducts.push(response['productos'][k].producto);
          this.selectedProducts[k].objetivos = response['productos'][k].objetivos;
          this.selectedProducts[k].fecha_venta = response['productos'][k].fecha_venta;
        }
      },
      error => {
        alert('Ha ocurrido un error');
      }
    );
  }

  /**
   * Función para dar formato YYYY-MM-DD a una fecha.
   * @param date 
   */
  formateDate(date) {
    return date.getFullYear() + '-' + ('0'+(date.getMonth()+1)).slice(-2) +
      '-' + ('0' + date.getDate()).slice(-2);
  }

  /**
   * Función para devolver la imagen a mostrar dependiendo la categoría.
   * @param category 
   */
  getImagenByCategory(category){
    var images = {
      "Estilo de vida": "dinero.png",
      "Hogar": "hogar.png",
      "Protección de Patrimonio": "inversion.png"
    };
    return "assets/images/"+
      (images.hasOwnProperty(category) ? images[category] : images['Hogar']);
  }

  /**
   * Función para mostrar la sección de productos seleccionados.
   */
  showSelected() {
    this.showSelectedProducts = true;
  }

  /**
   * Función para esconder la sección de productos seleccionados.
   */
  hideSelected() {
    this.showSelectedProducts = false;
  }

  /**
   * Función que actualiza la vista y agrega a la lista de productos seleccionados.
   * @param product Producto seleccionado.
   */
  selectProduct(product) {
    this.selectedProduct = product;
    this.selectedProducts.push(product);
  }

  /**
   * Función para eliminar de la lista de productos seleccionados el producto dado.
   * @param idProduct Id del producto a eliminar.
   */
  removeProduct(idProduct) {
    for (var k = 0; k < this.selectedProducts.length; k++) {
      if (idProduct === this.selectedProducts[k].id) {
        this.selectedProducts[k].isAdded = false;
        this.selectedProducts.splice(k,1);
      }
    }
  }

  /**
   * Función para agregar las elecciones de la vista al producto seleccionado.
   * Fecha de venta y objetivos asociados.
   */
  saveProduct() {
    this.selectedProduct['isAdded'] = true;
    this.selectedProduct['fecha_venta'] = this.productForm.value.selectedDate;
    this.productForm.controls['selectedDate'].setValue('');
    this.selectedProduct['objetivos'] = [];
    this.selectedProduct['objectivesName'] = [];
    for (let objective in this.objectives) {
      if (this.objectives[objective]['selected']) {
        this.selectedProduct['objetivos'].push(this.objectives[objective]);
        this.selectedProduct['objectivesName'].push(this.objectives[objective]['nombre']);
      }
      this.objectives[objective]['selected'] = false;
    }
    this.selectedProduct = undefined;
    this.anySelected = false;
  }

  /**
   * Función para mandar la petición de obtener el detalle de un producto. 
   * @param product 
   */
  showProductInfo(product) {
    this.productsService.getProduct(product.id)
    .subscribe(data => {
      this.currentProduct = data;
    });
  }

  /**
   * Función para cerrar las vistas de producto seleccionado y detalle del producto.
   */
  closeProductModal() {
    if (this.selectedProduct) {
      this.selectedProducts.pop();
    }
    this.currentProduct = undefined;
    this.selectedProduct = undefined;
  }

  /**
   * Función para mostral la vista para imprimir.
   */
  openPrintModal(){
    this.setBodyScroll('hidden');
    this.print_modal_open = true;
  }

  /**
   * Función para cerrar la vista para imprimir.
   */
  closePrintModal(){
    this.print_modal_open = false;
    this.setBodyScroll('auto');
  }

  /**
   * Función para actualizar el css del elemento body.
   * @param scroll_value Valor de scroll.
   */
   setBodyScroll(scroll_value){
    this.renderer.setStyle(document.body, 'overflow', scroll_value);
  }

  /**
   * Función para mandar la petición de actualizar los productos seleccionados del cliente.
   */
  goToDashboard(){
    let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
    var productAux = [];
    var objectivesAux = [];
    for (var k=0; k < this.selectedProducts.length;k++) {
      objectivesAux = [];
      for (var a=0; a < this.selectedProducts[k].objetivos.length;a++) {
        objectivesAux.push(this.selectedProducts[k].objetivos[a].id);
      }
      productAux.push({
        'id_producto': this.selectedProducts[k].id,
        'fecha_venta': this.selectedProducts[k].fecha_venta,
        'objetivos': objectivesAux
      });
    }
    var params = {
      'productos': productAux
    };
    this.productsService.putProducts(client_cis,params).subscribe(
      response => {
        this.router.navigate(['/next-checkup']);
      },
      error => {
        alert('Ha ocurrido un error');
      }
    );
  }

  /**
   * Función para actualizar el valor de un elemento check
   * @param currentObjective Objetivo a cambiar el valor.
   */
  check(currentObjective) {
    currentObjective.selected = !currentObjective.selected;
    this.anySelected = this.objectives.reduce(function(x,y) {
      return x || !!y.selected;
  }, false);
  }
}