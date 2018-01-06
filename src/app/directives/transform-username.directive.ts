import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

const usernameTransformRegexp = /^@*(.+)?$/;

const getTransformedUsername = (username: String = '') =>
  username.length ? username.replace(usernameTransformRegexp, '@$1') : username;

@Directive({
  selector: '[appTransformUsername]'
})
export class TransformUsernameDirective {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const value = getTransformedUsername((<HTMLInputElement>event.target).value.trim().toString());

    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
  }
}
