import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'client-finances',
  templateUrl: 'client-finances.view.html',
  styleUrls: ['client-finances.style.scss']
})

export class ClientFinancesComponent{
  /**
   * Constructor del componente de ficha de cliente
   * @param {Router} router Servicio para manejo de direccionamiento de rutas
   */
  constructor(public router: Router){}
}