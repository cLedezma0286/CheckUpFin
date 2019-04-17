import { Directive, Input, ElementRef, Renderer, HostListener, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

// Directive decorator
@Directive({ selector: '[maxValue]' })
// Directive class
export class MaxValue implements OnInit{
	private el: HTMLInputElement;
	@Input() maxValue: number;
	@Input() applyMaxValue: boolean;

    constructor(private elementRef: ElementRef, renderer: Renderer, private control: NgControl) {
    	this.el = this.elementRef.nativeElement;
    }

    numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

    ngOnInit() {
    	// console.log('this.applyMaxValue ngOnInit', this.applyMaxValue);
    	if(!this.applyMaxValue) return;
		let validNumber = this.textTransform(this.el.value); // opossite of transform
		let theValue = (validNumber > 0) ? (validNumber.toString().length > 4 ? '$' + this.numberWithCommas(validNumber) : validNumber) : '';
		this.control.control.setValue(theValue);


		this.control.valueChanges.subscribe(()  => {
			// console.log('valueChanges', this.el.value);
			if(!this.applyMaxValue) return;
			let validNumber = this.textTransform(this.el.value); // opossite of transform
			let theValue = (validNumber > 0) ? (validNumber.toString().length > 4 ? '$' + this.numberWithCommas(validNumber) : validNumber) : '';
			this.control.control.setValue(theValue, {emitEvent: false});
		})
    }

	textTransform(txt){
		txt = txt.replace(/\$/g, '');
		txt = txt.replace(/,/g, '');
		if(!this.maxValue) return txt;
		let text = (typeof txt == 'number') ? txt : Number(txt);
		// console.log('textTransform', txt, 'Number(txt)', Number(txt));
		return (text < this.maxValue) ? text : this.maxValue;
	}
}
