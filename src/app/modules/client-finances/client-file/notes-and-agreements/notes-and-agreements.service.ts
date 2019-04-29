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

  /**
   * Petición a servidor para obtener las notas del cliente con el id proporcionado.
   * @param idClient  Id del cliente.
   * @returns Observable de la petición para las notas.
   */
  getNotes(idClient) {
    return this.http.get(environment.CLIENTS_URL + '/' + idClient + '/notas');
  }

  /**
   * Petición a servidor para obtener los acuerdos del cliente con el id proporcionado.
   * @param idClient  Id del cliente.
   * @returns Observable de la petición para los acuerdos.
   */
  getAgreements(idClient) {
    return this.http.get(environment.CLIENTS_URL + '/' + idClient + '/acuerdos');
  }

  /**
   * Petición a servidor para eliminar la nota con el id proporcionado.
   * @param idNote  Id de la nota.
   * @returns Observable de la petición para eliminar una nota.
   */
  deleteNote(idNote) {
    return this.http.post(environment.NOTES_URL + '/' + idNote + '/delete', null);
  }

  /**
   * Petición a servidor para eliminar el acuerdo con el id proporcionado.
   * @param idAgreement  Id del acuerdo.
   * @returns Observable de la petición para eliminar un acuerdo.
   */
  deleteAgreement(idAgreement) {
    return this.http.post(environment.AGREEMENTS_URL + '/' + idAgreement + '/delete', null);
  }

  /**
   * Petición a servidor para crear una nota nueva.
   * @param note  JSON con el contenido de la nota nueva.
   * @returns Observable de la petición para crear una nota.
   */
  createNote(note){
    return this.http.post(environment.NOTES_URL, note);
  }

  /**
   * Petición a servidor para crear un acuerdo nuevo.
   * @param agreement JSON con el contenido del acuerdo nuevo.
   * @returns Observable de la petición para crear un acuerdo
   */
  createAgreement(agreement){
    return this.http.post(environment.AGREEMENTS_URL, agreement);
  }

  /**
   * Petición a servidor para editar una nota con el id proporcionado.
   * @param note JSON con el contenido nuevo de la nota.
   * @param note_id Id de la nota.
   * @returns Observable de la petición para editar una nota.
   */
  editNote(note, note_id){
    return this.http.post(environment.NOTES_URL + '/' + note_id, note);
  }

  /**
   * Petición a servidor para editar un acuerdo con el id proporcionado.
   * @param agreement JSON con el contenido nuevo del acuerdo.
   * @param agreement_id Id del acuerdo.
   * @returns Observable de la petición para editar un acuerdo.
   */
  editAgreement(agreement, agreement_id){
    return this.http.post(environment.AGREEMENTS_URL + '/' + agreement_id, agreement);
  }
}