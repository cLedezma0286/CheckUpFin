import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientSearchComponent } from './client-search.component';
import { DropdownComponent } from './dropdown/dropdown.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ClientSearchComponent,
    DropdownComponent
  ],
  exports: [
    ClientSearchComponent,
    DropdownComponent
  ]
})
export class ClientSearchModule {}