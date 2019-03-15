import { Component, Renderer2, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '@models/client.model';
import { ClientsService } from '@services/clients.service';
declare var jsCalendar: any;

@Component({
  selector: 'nextCheckup',
  templateUrl: 'next-checkup.view.html',
  styleUrls: ['next-checkup.style.scss']
})
export class NextCheckupComponent implements OnInit{
  firstView = true;
  showCalendar = false;
  name;
  nextCheckupDate;
  client_information;
  dateRequest;

  constructor(public renderer: Renderer2, public clientsService: ClientsService,
    public router: Router, public fb: FormBuilder){}

  ngOnInit() {
    let client_cis = JSON.parse(localStorage.getItem('client')).num_clie_cis;
    this.clientsService.getClientInformation(client_cis).subscribe(
      (response: Client) => {
        this.client_information = response;
        this.nextCheckupDate = this.getDateForObjectFormat(this.client_information.sig_checkup);
      }
    );
    this.name = JSON.parse(localStorage.getItem('client'))['nombre_clie'];
  }
  changeCalendar() {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar)this.initCalendar();
  }
  getDateForObjectFormat(date_dmy){
    let date_array_aux = date_dmy.split('-');
    return date_array_aux[2] + '/' + date_array_aux[1] + '/' + date_array_aux[0];
  }
  initCalendar() {
    var checkExist = setInterval(() => {
      if(document.getElementById('my-calendar')){
        var element = document.getElementById('my-calendar');
        var calendar = jsCalendar.new(element,
          new Date(this.client_information.sig_checkup), {
          language: 'es',
          navigatorPosition: 'right'
        });
        calendar.onDateClick((event, date) => {
          if (date.getDay()%6 !== 0) {
            calendar.set(date);
            this.updateNextCheckup(date);
            this.showCalendar = false;
          }
        });
        clearInterval(checkExist);
      }
    },100);
  }
  updateNextCheckup(nextDate) {
    this.nextCheckupDate = ('0' + nextDate.getDate()).slice(-2) + '/' +
      ('0'+(nextDate.getMonth()+1)).slice(-2) + '/' +
      nextDate.getFullYear();
    nextDate = nextDate.getFullYear() + '/' +
      ('0'+(nextDate.getMonth()+1)).slice(-2) + '/' +
      ('0' + nextDate.getDate()).slice(-2);
    this.dateRequest = {
      'sig_checkup': nextDate
    };
  }
  confirmNextCheckup() {
    let client_cis = JSON.parse(localStorage.getItem('client')).num_clie_cis;
    this.clientsService.setNextCheckupClient(client_cis, this.dateRequest)
    .subscribe(
    response => {
      this.firstView = !this.firstView;
    });
  }

  goToDashboard() {
    this.router.navigate(['/client-finances/client-file/dashboard']);
  }
}