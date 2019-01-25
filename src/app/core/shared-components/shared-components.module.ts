import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ClientHeaderComponent } from './client-header/client-header.component';
@NgModule({
  imports: [
    BrowserModule,
    RouterModule
  ],
  declarations: [
    ClientHeaderComponent
  ],
  exports: [
    ClientHeaderComponent
  ]
})
export class SharedComponentsModule {}