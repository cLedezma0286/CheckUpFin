import { Component } from '@angular/core';
import { NotesAndsAgreementsService } from './notes-and-agreements.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'notes-and-agreements',
  templateUrl: 'notes-and-agreements.view.html',
  styleUrls: ['notes-and-agreements.style.scss']
})
export class NotesAndAgreementsComponent{
  notes = [];
  agreements = [];
  currentNote;
  currentAgreement;
  showNote = false;
  showAgreement = false;
  validateForm = this.fb.group({
    title: ['', [Validators.required,]],
    description: ['', [Validators.required]]
  });

  constructor(public notesAgreementsService: NotesAndsAgreementsService,
    public fb: FormBuilder){
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

  showNoteView() {
    this.showNote = true;
  }

  editNote(note) {
    this.validateForm = this.fb.group({
      title: [note.titulo, [Validators.required,]],
      description: [note.descripcion, [Validators.required]]
    });
    this.currentNote = note;
    this.showNoteView();
  }

  showAgreementView() {
    this.showAgreement = true;
  }

  editAgreement(agreement) {
    this.validateForm = this.fb.group({
      title: [agreement.titulo, [Validators.required,]],
      description: [agreement.descripcion, [Validators.required]]
    });
    this.currentAgreement = agreement;
    this.showAgreementView();
  }

  closeModal() {
    this.showAgreement = false;
    this.showNote = false;
    this.currentAgreement = undefined;
    this.currentNote = undefined;
    this.validateForm = this.fb.group({
      title: ['', [Validators.required,]],
      description: ['', [Validators.required]]
    });
  }

  save() {

  }
}