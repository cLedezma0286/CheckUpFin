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
class RealEmailValidator implements Validator {
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



@Directive({
    selector: '[EmailValidator][formControlName],[EmailValidator][formControl],[EmailValidator][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true }
    ]
})

// function chkEmail()
// {
//   var inputVal = gField.value
//   if( inputVal.length == 0 )
//     return true
//   var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//   if ( !expr.test(inputVal) )
// 	  return false
// return true
// }

class EmailValidator implements Validator {
	validateMail(val: string) {

		const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		const test = regex.test(val);
		return test;

	};

    validate(control: AbstractControl): { [key: string]: any } {
        // self value (e.g. retype password)
        if(control.value && control.value.length > 0){

			const isValidEmail = this.validateMail(control.value);
			return (!isValidEmail || !control.value.length) ? { invalid_characters: isValidEmail } : null;
		
		}else{
			return null;
		}
    }
}

export { EmailValidator, RealEmailValidator }