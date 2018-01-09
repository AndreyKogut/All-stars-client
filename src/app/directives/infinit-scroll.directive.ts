import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appInfinitScrollDirective]',
})
export class InfinitScrollDirective {
  @Output() scrolledDown = new EventEmitter<void>();
  @Input() emitEventEnabled: boolean;

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    const { scrollTop, offsetHeight, clientHeight } = event.target.scrollingElement;

    if (
      Math.round(scrollTop / 10) * 10 === Math.round((offsetHeight - clientHeight - 200) / 10) * 10
      && this.emitEventEnabled
    ) {
      this.scrolledDown.emit();
    }
  }
}
