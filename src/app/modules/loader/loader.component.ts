import { Component, OnDestroy } from "@angular/core";
import { Router } from '@angular/router';
@Component({
  selector: 'loader',
  templateUrl: 'loader.view.html',
  styleUrls: ['loader.style.scss']
})
export class LoaderComponent implements OnDestroy{
  textLoading = '';
  percentage = 0;
  circle: any;
  delay: number;
  radio: number;
  duration: number;
  count: number;
  increment = 0;
  interval;
  interval2;
  constructor( public router: Router){
    this.textLoading = router.url === '/loading/edras'? 'Cargando EDRAS' : 'Calculando salud financiera';
    this.interval = setInterval(() => {
      if(document.querySelector(".outer")){
        this.circle = document.querySelector(".outer");
        this.radio = this.circle.getAttribute('r');
        this.circle.style.strokeDasharray = 2 * Math.PI * this.radio;
        this.delay = 100;

        this.duration = router.url === '/loading/EDRAS'? 50*100 : 3000;
        this.increment = this.delay*100/this.duration;

        this.count = this.duration/this.delay;
        this.startAnimation();
        clearInterval(this.interval);
      }
    },100);
  }
  ngOnDestroy(){
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.interval2) {
      clearInterval(this.interval2);
    }
  }
  startAnimation() {
    this.interval2 = setInterval(() => {
      this.percentage += this.increment;
      this.circle.style.strokeDashoffset = this.calculatePercentage(this.radio, this.percentage);
      if(this.percentage > 99){
        this.circle.style.strokeDashoffset = this.calculatePercentage(this.radio, 100);
        this.changeColor();
        clearInterval(this.interval2);
      }
    },100);
  }
  changeColor() {
    this.circle.style.stroke = '#AAA20A';
    document.querySelector('.icon')['style']['fill'] = '#AAA20A';
    if (this.router.url.indexOf('loading')) {
      setTimeout(() => {
        this.router.navigate(['interview']);
      }, 1000);
    }
  }
  calculatePercentage = function(r, percent) {
    var val = parseInt(percent);
    var c = Math.PI * (r * 2);
    if (val < 0) {
      val = 0;
    }
    if (val > 100) {
      val = 100;
    }
    var pct = ((100 - val) / 100) * c;
    return pct;
  }
}