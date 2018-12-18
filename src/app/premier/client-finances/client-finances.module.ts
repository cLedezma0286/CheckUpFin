import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HeaderModule } from "./header/header.module";
import { ProductsModule } from "./products/products.module";
import { ClientFinancesComponent } from "./client-finances.component";

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    HeaderModule,
    ProductsModule
  ],
  declarations: [
    ClientFinancesComponent
  ],
  exports: [
    ClientFinancesComponent
  ]
})
export class ClientFinancesModule {}