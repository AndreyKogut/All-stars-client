import { Component, Input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.less'],
  animations: [
    trigger('error-toast', [
      transition('void => *', [
        style({
          transform: 'translateY(100%)',
          opacity: 0,
        }),
        animate(500, style({
          transform: 'translateY(0)',
          opacity: 1,
        })),
      ]),
      transition('* => void', [
        style({
          transform: 'translateY(0)',
          opacity: 1,
        }),
        animate(500, style({
          transform: 'translateY(100%)',
          opacity: 0,
        }))
      ])
    ]),
  ]
})
export class FormErrorComponent {
  @Input() error: string;
}
