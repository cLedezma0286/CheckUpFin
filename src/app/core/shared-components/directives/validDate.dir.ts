import { ElementRef, Input, HostListener, Injectable, Renderer2, Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, AsyncValidatorFn , FormControl, Validators, AsyncValidator } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Directive({
    selector: '[DateValidator][formControlName],[DateValidator][formControl],[DateValidator][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateValidator), multi: true }
    ]
})

export class DateValidator implements Validator {
	@Input() DateValidator: boolean;
	el: HTMLInputElement;

	constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    	this.el = this.elementRef.nativeElement;
    }

	validateDate(val: string) {

		const regex = /^(19[5-9][0-9]|20[0-4][0-9]|2050)[-/]?(0[1-9]|1[0-2])[-/]?(0[1-9]|[12][0-9]|3[01])$/;
		const test = regex.test(val);
		return test;

	};

    validate(control: AbstractControl): { [key: string]: any } {
        // self value (e.g. retype password)
        const isValidDate = this.validateDate(control.value);
        console.log('isValidDate', isValidDate, control.value);
		this.el.style.borderBottomColor =  ((!isValidDate || !control.value.length) && this.DateValidator && control.touched) ? '#db0011' : '#d7d8d6';
		return ( (!isValidDate || !control.value.length) && this.DateValidator) ? { invalid_characters: isValidDate } : null;
    }
}
