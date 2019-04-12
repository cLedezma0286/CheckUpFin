import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterviewComponent } from './interview.component';
import { AddObjectiveComponent } from './add-objective/add-objective.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { SharedComponentsModule } from '@shared-components/shared-components.module';

import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  declarations: [
    InterviewComponent,
    AddObjectiveComponent,
    AddNotesComponent
  ],
  exports: [
    InterviewComponent,
    SharedComponentsModule
  ]
})
export class InterviewModule {}