import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { switchMap, debounceTime } from 'rxjs/operators';
import { ClientsService } from '@services/clients.service';
@Component({
  selector: 'client-search',
  templateUrl: 'client-search.view.html',
  styleUrls: ['client-search.style.scss']
})
export class ClientSearchComponent{
  cis = new FormControl();
  cis_form: FormGroup = this.fb.group({
    'cis': this.cis
  });
  client = null;
  loading = false;
  constructor(public router: Router, public fb: FormBuilder, public clientsService: ClientsService){}
  ngOnInit() {
    this.searchClient();
  }
  searchClient() {
    this.cis.valueChanges.pipe(
      debounceTime(750),
      switchMap(id => {
        this.loading = true;
        return this.clientsService.getClientInformation(id);
      })
    ).subscribe(
      res => {
        this.client = res;
        this.loading = false;
        this.searchClient();
      },
      error => {
        this.client = null;
        this.loading = false;
        this.searchClient();
      }
    );
  }
}