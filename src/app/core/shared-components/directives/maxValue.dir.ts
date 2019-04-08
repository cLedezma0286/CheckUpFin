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

    ngOnInit() {
    	console.log('this.applyMaxValue', this.applyMaxValue);
    	if(!this.applyMaxValue) return;
		let validNumber = this.textTransform(this.el.value); // opossite of transform
		this.el.value = validNumber.toString();
		// this.control.control.setValue(validNumber);
    }

	@HostListener("input", ["$event.target.value"])
	onInput(value) {
		console.log('this.applyMaxValue', this.applyMaxValue);
		if(!this.applyMaxValue) return;
		let validNumber = this.textTransform(value); // opossite of transform
		this.el.value = validNumber.toString();
		// this.control.control.setValue(validNumber);
	}

	textTransform(txt){
		this.maxValue = (this.maxValue) ? this.maxValue : 100000000000;
		let text = (typeof txt == 'number') ? txt : Number(txt);
		return (text < this.maxValue) ? text : this.maxValue;
	}
}
