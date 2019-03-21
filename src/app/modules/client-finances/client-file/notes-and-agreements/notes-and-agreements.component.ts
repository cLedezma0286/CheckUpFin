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
    let client_cis = JSON.parse(localStorage.getItem('client')).num_clie_cis;
    this.notesAgreementsService.getNotes(client_cis).subscribe(
      data => {
        this.notes = data['notas'];
      },
      error => {
        alert('Ha ocurrido un error');
      }
    );
  }

  getAgreements() {
    let client_cis = JSON.parse(localStorage.getItem('client')).num_clie_cis;
    this.notesAgreementsService.getAgreements(client_cis).subscribe(
      data => {
        this.agreements = data['acuerdos'];
      },
      error => {
        alert('Ha ocurrido un error');
      }
    );
  }

  deleteNote(note) {
    if (window.confirm('¿Eliminar definitivamente?')) {
      this.notesAgreementsService.deleteNote(note.id).subscribe(
        data => {
          this.getNotes();
        },
        error => {
          alert('Ha ocurrido un error');
        }
      );
    }
  }

  deleteAgreement(agreement) {
    if (window.confirm('¿Eliminar definitivamente?')) {
      this.notesAgreementsService.deleteAgreement(agreement.id).subscribe(
        data => {
          this.getAgreements();
        },
        error => {
          alert('Ha ocurrido un error');
        }
      );
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
    if (this.showAgreement) {
      if (this.currentAgreement) {
        let client_cis = JSON.parse(localStorage.getItem('client')).num_clie_cis;
        let agreement_aux = {
          titulo: this.validateForm.value.title,
          descripcion: this.validateForm.value.description,
          tipo_nota: 'acuerdo',
          num_clie_cis: client_cis
        }
        this.notesAgreementsService.editAgreement(agreement_aux, this.currentAgreement.id).subscribe(
          response => {
            this.closeModal();
            this.getAgreements();
          },
          error => {
            alert('Ha ocurrido un error');
          }
        );
      } else {
        let client_cis = JSON.parse(localStorage.getItem('client')).num_clie_cis;
        let agreement_aux = {
          titulo: this.validateForm.value.title,
          descripcion: this.validateForm.value.description,
          tipo_nota: 'acuerdo',
          num_clie_cis: client_cis
        }
        this.notesAgreementsService.createAgreement(agreement_aux).subscribe(
          response => {
            this.closeModal();
            this.getAgreements();
          },
          error => {
            alert('Ha ocurrido un error');
          }
        );
      }
    } else if (this.showNote) {
      if (this.currentNote) {
        let client_cis = JSON.parse(localStorage.getItem('client')).num_clie_cis;
        let note_aux = {
          titulo: this.validateForm.value.title,
          descripcion: this.validateForm.value.description,
          tipo_nota: 'nota',
          num_clie_cis: client_cis
        }
        this.notesAgreementsService.editNote(note_aux, this.currentNote.id).subscribe(
          response => {
            this.closeModal();
            this.getNotes();
          },
          error => {
            alert('Ha ocurrido un error');
          }
        );
      } else {
        if (this.validateForm.valid) {
          let client_cis = JSON.parse(localStorage.getItem('client')).num_clie_cis;
          let note_aux = {
            titulo: this.validateForm.value.title,
            descripcion: this.validateForm.value.description,
            tipo_nota: 'nota',
            num_clie_cis: client_cis
          }
          this.notesAgreementsService.createNote(note_aux).subscribe(
            response => {
              this.closeModal();
              this.getNotes();
            },
            error => {
              alert('Ha ocurrido un error');
            }
          );
        }
      }
    }
  }
}