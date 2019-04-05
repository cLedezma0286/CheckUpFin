import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeModule } from "./modules/home/home.module";
import { LoaderModule } from './modules/loader/loader.module';
import { NextCheckupModule } from './modules/next-checkup/next-checkup.module';
import { ClientFinancesModule } from './modules/client-finances/client-finances.module';
import { ClientSearchModule } from './modules/client-search/client-search.module';
import { InterviewModule } from './modules/interview/interview.module';
import { GeneralInterceptor } from '@interceptors/general.interceptor';

import { NoSpecialChars } from './core/directives/noSpecialChars.dir';
import { MaxValue } from './core/directives/maxValue.dir';
import { RealEmailValidator } from './core/directives/email.dir';


@NgModule({
  declarations: [
    AppComponent,
    RealEmailValidator
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    routing,
    HomeModule,
    LoaderModule,
    InterviewModule,
    ClientFinancesModule,
    ClientSearchModule,
    NextCheckupModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: GeneralInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}