import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'home',
  templateUrl: 'home.view.html',
  styleUrls: ['home.style.scss']
})
export class HomeComponent{
  /**
   * Constructor del componente Inicial
   * @param router Servicio de manejo de rutas.
   */
  constructor(public router: Router){}

  /**
   * Función para redirigir a la vista del cargador.
   */
  goToEDRASLoader(){
    this.router.navigate(['/loading/edras']);
  }
}