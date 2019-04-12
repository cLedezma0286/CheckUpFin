import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ClientHeaderComponent } from './client-header/client-header.component';
import { PrintoutComponent } from './printout/printout.component';


import { RealEmailValidator, EmailValidator } from './directives/email.dir';
import { NoSpecialChars } from './directives/noSpecialChars.dir';
import { MaxValue } from './directives/maxValue.dir';
import { NotNumbersDirective } from './directives/not-numbers.dir';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule
  ],
  declarations: [
    ClientHeaderComponent,
    PrintoutComponent,
    RealEmailValidator, 
    EmailValidator,
    NoSpecialChars,
    MaxValue,
    NotNumbersDirective
  ],
  exports: [
    ClientHeaderComponent,
    PrintoutComponent,
    NoSpecialChars,
    MaxValue,
    RealEmailValidator, 
    EmailValidator,
    NotNumbersDirective
  ]
})
export class SharedComponentsModule {}