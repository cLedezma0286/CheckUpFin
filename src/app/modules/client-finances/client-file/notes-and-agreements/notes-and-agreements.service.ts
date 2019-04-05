import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesAndsAgreementsService {
  currentNote;
  currentAgreement;
  
  constructor(private http: HttpClient) { }

  getNotes(idClient) {
    return this.http.get(environment.CLIENTS_URL + '/' + idClient + '/notas');
  }

  getAgreements(idClient) {
    return this.http.get(environment.CLIENTS_URL + '/' + idClient + '/acuerdos');
  }

  deleteNote(idNote) {
    return this.http.post(environment.NOTES_URL + '/' + idNote + '/delete', null);
  }

  deleteAgreement(idAgreement) {
    return this.http.post(environment.AGREEMENTS_URL + '/' + idAgreement + '/delete', null);
  }

  createNote(note){
    return this.http.post(environment.NOTES_URL, note);
  }

  createAgreement(agreement){
    return this.http.post(environment.AGREEMENTS_URL, agreement);
  }

  editNote(note, note_id){
    return this.http.post(environment.NOTES_URL + '/' + note_id, note);
  }

  editAgreement(agreement, agreement_id){
    return this.http.post(environment.AGREEMENTS_URL + '/' + agreement_id, agreement);
  }
}