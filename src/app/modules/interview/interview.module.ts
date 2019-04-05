import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterviewComponent } from './interview.component';
import { AddObjectiveComponent } from './add-objective/add-objective.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { SharedComponentsModule } from '@shared-components/shared-components.module';

import { NoSpecialChars } from '../../core/directives/noSpecialChars.dir';
import { MaxValue } from '../../core/directives/maxValue.dir';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  declarations: [
    InterviewComponent,
    AddObjectiveComponent,
    AddNotesComponent,
    NoSpecialChars,
    MaxValue
  ],
  exports: [
    InterviewComponent,
    NoSpecialChars,
    MaxValue
  ]
})
export class InterviewModule {}