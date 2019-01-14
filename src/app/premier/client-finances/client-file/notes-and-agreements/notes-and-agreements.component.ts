import { Component } from '@angular/core';
import { NotesAndsAgreementsService } from './notes-and-agreements.service';
  import { from } from 'rxjs';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'notes-and-agreements',
  templateUrl: 'notes-and-agreements.view.html',
  styleUrls: ['notes-and-agreements.style.scss']
})
export class NotesAndAgreementsComponent{
  notes = [];
  agreements = [];
  constructor(public notesAgreementsService: NotesAndsAgreementsService){
    this.getNotes();
    this.getAgreements();
  }

  getNotes() {
    this.notesAgreementsService.getNotes(27)
    .subscribe(data => {
      this.notes = data['notas'];
    });
  }

  getAgreements() {
    this.notesAgreementsService.getAgreements(27)
    .subscribe(data => {
      this.agreements = data['acuerdos'];
    });
  }

  deleteNote(note) {
    if (window.confirm('¿Eliminar definitivamente?')) {
      this.notesAgreementsService.deleteNote(note.id)
      .subscribe(data => {
        this.getNotes();
      },
      error => {});
    }
  }

  deleteAgreement(agreement) {
    if (window.confirm('¿Eliminar definitivamente?')) {
      this.notesAgreementsService.deleteAgreement(agreement.id)
      .subscribe(data => {
        this.getAgreements();
      },
      error => {});
    }
  }
}