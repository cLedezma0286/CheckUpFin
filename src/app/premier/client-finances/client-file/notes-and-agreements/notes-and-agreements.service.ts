import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';

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
    return this.http.delete(environment.NOTES_URL + '/' + idNote);
  }

  deleteAgreement(idAgreement) {
    return this.http.delete(environment.AGREEMENTS_URL + '/' + idAgreement);
  }
}