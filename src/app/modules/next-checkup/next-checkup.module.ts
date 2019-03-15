import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NextCheckupComponent } from "./next-checkup.component";
@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    NextCheckupComponent
  ],
  exports: [
    NextCheckupComponent
  ]
})
export class NextCheckupModule {}