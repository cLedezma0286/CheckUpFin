import { Directive, Input, ElementRef, Renderer, HostListener, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

// Directive decorator
@Directive({ selector: '[maxValue]' })
// Directive class
export class MaxValue implements OnInit{
	private el: HTMLInputElement;
	private regex: RegExp = new RegExp(/^[A-Za-z]+$/);
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
			console.log('valueChanges', this.el.value, this.maxValue, this.applyMaxValue);
			if(!this.applyMaxValue) return;
			let validNumber = this.textTransform(this.el.value); // opossite of transform(validNumber == 0 ? 0 : '');
			let theValue = (validNumber.toString().length > 3) ? 
								'$' + this.numberWithCommas(validNumber) 
								: 
								(validNumber.toString().length > 1 ? (validNumber > 0 ? Math.round(validNumber) : 0) : validNumber);
			this.control.control.setValue(theValue, {emitEvent: false});
		});
    }

    @HostListener('keydown', [ '$event' ])
	onInput(event: KeyboardEvent) {
		// Allow: Delete, Backspace, Tab, Escape, Enter
		if (
			[46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 || 
			(event.keyCode === 65 && event.ctrlKey === true) || // Allow: Ctrl+A
			(event.keyCode === 67 && event.ctrlKey === true) || // Allow: Ctrl+C
			(event.keyCode === 86 && event.ctrlKey === true) || // Allow: Ctrl+V
			(event.keyCode === 88 && event.ctrlKey === true) || // Allow: Ctrl+X
			(event.keyCode === 65 && event.metaKey === true) || // Cmd+A (Mac)
			(event.keyCode === 67 && event.metaKey === true) || // Cmd+C (Mac)
			(event.keyCode === 86 && event.metaKey === true) || // Cmd+V (Mac)
			(event.keyCode === 88 && event.metaKey === true) || // Cmd+X (Mac)
			(event.keyCode >= 35 && event.keyCode <= 39) // Home, End, Left, Right
			) {
			return;  // let it happen, don't do anything
		}

		if(this.applyMaxValue) {

			if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
				event.preventDefault();
			}
			
		}
	}

	textTransform(txt){
		// console.log('textTransform', txt);
		txt = txt.replace(/\$/g, '');
		txt = txt.replace(/,/g, '');
		if(!this.maxValue) return txt;
		let text = (typeof txt == 'number') ? txt : Number(txt);
		// console.log('textTransform', txt, 'txt.length', txt.length, 'Number(txt)', Number(txt), 'text', text);
		return (text < this.maxValue) ? text : this.maxValue;
	}
}
