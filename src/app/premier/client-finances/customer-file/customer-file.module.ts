import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CustomerFileComponent } from './customer-file.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FinancialHealthComponent } from './financial-health/financial-health.component';
import { NotesAndAgreementsComponent } from './notes-and-agreements/notes-and-agreements.component';
@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    CustomerFileComponent,
    DashboardComponent,
    FinancialHealthComponent,
    NotesAndAgreementsComponent
  ],
  exports: [
    CustomerFileComponent
  ]
})
export class CustomerFileModule {}