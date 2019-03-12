import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'client-search',
  templateUrl: 'client-search.view.html',
  styleUrls: ['client-search.style.scss']
})
export class ClientSearchComponent{
  cis_form: FormGroup = this.fb.group({
    'cis': ['', []]
  });
  constructor(public router: Router, public fb: FormBuilder){}
}