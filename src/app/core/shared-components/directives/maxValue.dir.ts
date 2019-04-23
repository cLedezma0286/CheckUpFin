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
		let theValue = (validNumber > 0) ? (validNumber.toString().length > 3 ? '$' + this.numberWithCommas(validNumber) : validNumber) : '';
		this.control.control.setValue(theValue);


		this.control.valueChanges.subscribe(()  => {
			// console.log('valueChanges', this.el.value);
			if(!this.applyMaxValue) return;
			let validNumber = this.textTransform(this.el.value); // opossite of transform(validNumber == 0 ? 0 : '');
			let theValue = (validNumber.toString().length > 3) ? 
								'$' + this.numberWithCommas(validNumber) 
								: 
								(validNumber.toString().length > 1 ? (validNumber > 0 ? Math.round(validNumber) : 0) : validNumber);
			this.control.control.setValue(theValue, {emitEvent: false});
		});
    }

	textTransform(txt){
		console.log('textTransform', txt);
		txt = txt.replace(/\$/g, '');
		txt = txt.replace(/,/g, '');
		if(!this.maxValue || txt.length == 0) return txt;
		let text = (typeof txt == 'number') ? txt : Number(txt);
		console.log('textTransform', txt, 'txt.length', txt.length, 'Number(txt)', Number(txt), 'text', text);
		return (text < this.maxValue) ? text : this.maxValue;
	}
}
