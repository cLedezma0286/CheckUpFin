import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeModule } from "./premier/home/home.module";
import { LoaderModule } from './premier/loader/loader.module';
import { ClientSearchModule } from "./premier/client-search/client-search.module";
import { ClientFinancesModule } from './premier/client-finances/client-finances.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    routing,
    HomeModule,
    LoaderModule,
    ClientSearchModule,
    ClientFinancesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
