import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HeaderService{
  percentage_source = new BehaviorSubject(0);
  current_percentage = this.percentage_source.asObservable();
  subtitle_source = new BehaviorSubject('');
  current_subtitle = this.subtitle_source.asObservable();
  constructor(){}
  changePercentage(percentage) {
    this.percentage_source.next(percentage);
  }
  changeSubtitle(subtitle) {
  	this.subtitle_source.next(subtitle);
  }
}