import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutComponent } from "./layout.component";
import { HeaderModule } from './header/header.module';

@NgModule({
  imports: [
    BrowserModule,
    HeaderModule
  ],
  declarations: [
    LayoutComponent
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule {
}