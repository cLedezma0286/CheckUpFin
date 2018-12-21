import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HeaderService{
  percentageSource = new BehaviorSubject(0);
  currentPercentage = this.percentageSource.asObservable();
  constructor(){}
  changePorcentage(porcentage) {
    this.percentageSource.next(porcentage);
  }
}