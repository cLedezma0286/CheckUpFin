import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClientFileComponent } from './client-file.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GeneralClientInformationComponent } from './dashboard/general-client-information/general-client-information.component';
import { EditClientInformationComponent } from './dashboard/edit-client-information/edit-client-information.component';
import { FinancialHealthComponent } from './financial-health/financial-health.component';
import { CalculationExplanationComponent } from './financial-health/calculation-explanation/calculation-explanation.component';
import { AddObjectiveComponent } from './financial-health/add-objective/add-objective.component';
import { NotesAndAgreementsComponent } from './notes-and-agreements/notes-and-agreements.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ClientFileComponent,
    DashboardComponent,
    GeneralClientInformationComponent,
    EditClientInformationComponent,
    FinancialHealthComponent,
    NotesAndAgreementsComponent,
    CalculationExplanationComponent,
    AddObjectiveComponent
  ],
  exports: [
    ClientFileComponent
  ]
})
export class ClientFileModule {}