import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ClientSearchComponent } from "./client-search.component";
@NgModule({
  imports: [
    BrowserModule,
    FormsModule
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