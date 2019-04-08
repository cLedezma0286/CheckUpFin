import { ElementRef, Input, HostListener, Injectable, Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, AsyncValidatorFn , FormControl, Validators, AsyncValidator } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
    selector: '[RealEmailValidator][formControlName],[RealEmailValidator][formControl],[RealEmailValidator][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => RealEmailValidator), multi: true }
    ]
})
export class RealEmailValidator implements Validator {
	@Input() RealEmailValidator: boolean;

	validateEmail(val: string) {
		let atIndex = val.indexOf('@'),
			atTimesOccurrance = val.replace(/[^@]/g, "").length,
			dotLastIndex = val.lastIndexOf('.'),
			emailLengthMinusOne = val.length - 1;

		return (
			(atIndex != 0 && atIndex != emailLengthMinusOne && atIndex !== -1) 
			&& 
			(dotLastIndex !== -1 && dotLastIndex != emailLengthMinusOne)
			&&
			(atIndex < dotLastIndex && dotLastIndex - atIndex > 1)
			&&
			atTimesOccurrance == 1
			) ? true : false;
	};

    validate(control: AbstractControl): { [key: string]: any } {
        // self value (e.g. retype password)
        if(control.value && control.value.length > 0){

			const isValidEmail = this.validateEmail(control.value);
			return ((!isValidEmail || !control.value.length) && this.RealEmailValidator) ? { invalid_characters: isValidEmail } : null;
		
		}else{
			return null;
		}
    }
}