import {Directive, HostBinding, HostListener} from '@angular/core';

const usernameTransformRegexp = /^@*(.+)?$/;

const getTransformedUsername = (username: String = '') =>
  username.length ? username.replace(usernameTransformRegexp, '@$1') : username;

@Directive({
  selector: '[appTransformUsername]'
})
export class TransformUsernameDirective {
  @HostBinding('value') value;

  @HostListener('input', ['$event'])
  onChange(event) {
    this.value = getTransformedUsername(event.target.value.trim());
  }
}
