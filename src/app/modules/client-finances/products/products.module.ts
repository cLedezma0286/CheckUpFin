import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductsComponent } from "./products.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { PrintoutComponent } from "./printout/printout.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    PrintoutComponent
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule {
}