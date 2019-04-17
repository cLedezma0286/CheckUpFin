import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ClientHeaderComponent } from './client-header/client-header.component';
import { PrintoutComponent } from './printout/printout.component';


import { RealEmailValidator, EmailValidator } from './directives/email.dir';
import { NoSpecialChars } from './directives/noSpecialChars.dir';
import { MaxValue } from './directives/maxValue.dir';
import { DateValidator } from './directives/validDate.dir';
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
    NotNumbersDirective,
    DateValidator
  ],
  exports: [
    ClientHeaderComponent,
    PrintoutComponent,
    NoSpecialChars,
    MaxValue,
    RealEmailValidator, 
    EmailValidator,
    NotNumbersDirective,
    DateValidator
  ]
})
export class SharedComponentsModule {}