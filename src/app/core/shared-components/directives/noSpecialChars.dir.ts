import { Directive, Input, ElementRef, Renderer, HostListener, OnInit } from '@angular/core';
import * as XRegExp from 'xregexp';
import { NgControl } from '@angular/forms';

// Directive decorator
@Directive({ selector: '[noSpecialChars]' })
// Directive class
export class NoSpecialChars {
	private el: HTMLInputElement;
	private isSpecialChar: boolean;
	@Input() noSpecialChars: boolean;

    constructor(private elementRef: ElementRef, renderer: Renderer, private control: NgControl) {
    	this.el = this.elementRef.nativeElement;
    }

	@HostListener("input", ["$event.target.value"])
	onInput(value) {
		let start = this.el.selectionStart,
			end = this.el.selectionEnd;

		let noSpecialCharsText = this.textTransform(value); // opossite of transform
		if ( value.length && this.isSpecialChar ) this.control.control.setValue(noSpecialCharsText)
	}

	textTransform(txt){
		const regex = XRegExp("[^\-\_\%\´\\s\\pN\\p{Latin}]+", "g");
		var replaced = XRegExp.replace(txt, regex, "");

		this.isSpecialChar = (replaced.trim() != txt.trim()) ? true : false;
		console.log('this.noSpecialChars', this.noSpecialChars, txt, 'replaced', replaced);
		return (this.noSpecialChars) ? XRegExp.replace(txt, regex, "") : txt;
	}
}