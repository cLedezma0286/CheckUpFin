import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InterviewComponent } from "./interview.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    InterviewComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    InterviewComponent
  ]
})
export class InterviewModule {
}