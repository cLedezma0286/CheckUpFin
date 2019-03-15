import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientSearchComponent } from './client-search.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SharedComponentsModule } from '@shared-components/shared-components.module';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule
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