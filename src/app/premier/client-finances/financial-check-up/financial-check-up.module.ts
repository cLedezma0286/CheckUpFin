import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FinancialCheckUpComponent } from "./financial-check-up.component";

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    FinancialCheckUpComponent
  ],
  exports: [
    FinancialCheckUpComponent
  ]
})
export class FinancialCheckUpModule {
}