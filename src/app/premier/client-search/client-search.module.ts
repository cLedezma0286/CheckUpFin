import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClientSearchComponent } from "./client-search.component";

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    ClientSearchComponent
  ],
  exports: [
    ClientSearchComponent
  ]
})
export class ClientSearchModule {
}