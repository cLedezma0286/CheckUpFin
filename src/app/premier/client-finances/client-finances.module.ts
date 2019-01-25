import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { ProductsModule } from "./products/products.module";
import { ClientFileModule } from "./client-file/client-file.module";
import { ClientFinancesComponent } from "./client-finances.component";

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    ProductsModule,
    ClientFileModule
  ],
  declarations: [
    ClientFinancesComponent,
    HeaderComponent
  ],
  exports: [
    ClientFinancesComponent,
    HeaderComponent
  ]
})
export class ClientFinancesModule {}