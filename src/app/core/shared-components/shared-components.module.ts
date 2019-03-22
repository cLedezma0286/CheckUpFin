import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ClientHeaderComponent } from './client-header/client-header.component';
import { PrintoutComponent } from './printout/printout.component';
@NgModule({
  imports: [
    BrowserModule,
    RouterModule
  ],
  declarations: [
    ClientHeaderComponent,
    PrintoutComponent
  ],
  exports: [
    ClientHeaderComponent,
    PrintoutComponent
  ]
})
export class SharedComponentsModule {}