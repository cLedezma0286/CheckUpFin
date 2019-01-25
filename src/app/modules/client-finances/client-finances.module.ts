import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ProductsModule } from './products/products.module';
import { ClientFileModule } from './client-file/client-file.module';
import { ClientFinancesComponent } from './client-finances.component';
import { SharedComponentsModule } from '@shared-components/shared-components.module';
@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    ProductsModule,
    ClientFileModule,
    SharedComponentsModule
  ],
  declarations: [
    ClientFinancesComponent
  ],
  exports: [
    ClientFinancesComponent
  ]
})
export class ClientFinancesModule {}