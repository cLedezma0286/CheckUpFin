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

  /**
   * Construcctor del componente de Notas y acuerdos.
   * @param notesAgreementsService Servicio de notas y acuerdos
   * @param fb Servicio de manejo de forms.
   */
  constructor(public notesAgreementsService: NotesAndsAgreementsService,
    public fb: FormBuilder){
    this.getNotes();
    // this.getAgreements();
  }

  /**
   * Función para mandar la petición de obtener las notas del cliente usando su num_clie_cis.
   */
  getNotes() {
    let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
    this.notesAgreementsService.getNotes(client_cis).subscribe(
      data => {
        this.notes = data['notas'];
      },
      error => {
        alert('Ha ocurrido un error');
      }
    );
  }

  /**
   * Función para mandar la petición de obtener los acuerdos del cliente usando su num_clie_cis.
   */
  getAgreements() {
    let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
    this.notesAgreementsService.getAgreements(client_cis).subscribe(
      data => {
        this.agreements = data['acuerdos'];
      },
      error => {
        alert('Ha ocurrido un error');
      }
    );
  }

  /**
   * Función para mandar la petición de eliminar una nota seleccionada.
   * @param note La nota a eliminar.
   */
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

  /**
   * Función para mandar la petición de eliminar un acuerdo seleccionado.
   * @param agreement El acuerdo a eliminar.
   */
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

  /**
   * Función para mostrar la sección de la información de una nota.
   */
  showNoteView() {
    this.showNote = true;
  }

  /**
   * Función para cargar a la vista la información de la nota a editar.
   * @param note Nota a editar.
   */
  editNote(note) {
    this.validateForm = this.fb.group({
      title: [note.titulo, [Validators.required,]],
      description: [note.descripcion, [Validators.required]]
    });
    this.currentNote = note;
    this.showNoteView();
  }

  /**
   * Función para mostrar la sección de la información de un acuerdo.
   */
  showAgreementView() {
    this.showAgreement = true;
  }

  /**
   * Función para cargar a la vista la información del acuerdo a editar.
   * @param agreement Acuerdo a editar.
   */
  editAgreement(agreement) {
    this.validateForm = this.fb.group({
      title: [agreement.titulo, [Validators.required,]],
      description: [agreement.descripcion, [Validators.required]]
    });
    this.currentAgreement = agreement;
    this.showAgreementView();
  }

  /**
   * Función para limpiar la vista de edición/creación de una nota o acuerdo,
   * y regresar a la vista que enlista los acuerdos y notas.
   */
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

  /**
   * Función que evalua la vista y si se trata de una edición o creación de un elemento,
   * invocando la patición adecuada.
   */
  save() {
    if (this.showAgreement) {
      if (this.currentAgreement) {
        let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
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
        let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
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
        let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
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
          let client_cis = JSON.parse(localStorage.getItem('cliente')).num_clie_cis;
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