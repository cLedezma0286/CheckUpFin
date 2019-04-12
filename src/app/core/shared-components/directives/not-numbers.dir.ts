import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
 selector: '[noNumbers]'
})
export class NotNumbersDirective {
  @Input() noNumbers: boolean;
 // Allow decimal numbers and negative values
 private regex: RegExp = new RegExp(/^([^0-9]*)$/g);
 // Allow key codes for special events. Reflect :
 // Backspace, tab, end, home
 private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', '-' ];

constructor(private el: ElementRef) {
 }
 @HostListener('keydown', [ '$event' ])
 onInput(event: KeyboardEvent) {
 // Allow Backspace, tab, end, and home keys
 if (this.specialKeys.indexOf(event.key) !== -1 && this.noNumbers) {
   return;
 }
 let current: string = this.el.nativeElement.value;
 let next: string = current.concat(event.key);
 
 if (next && !String(next).match(this.regex) && this.noNumbers) {
   event.preventDefault();
 }
 }
}