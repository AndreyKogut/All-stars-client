import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformInterests',
})
export class InterestsStrTransformPipe implements PipeTransform {
  transform([first = '', ...restItems]: string[], withCapitalizedFirstItem: boolean) {
    return `${withCapitalizedFirstItem
      ? first.charAt(0).toUpperCase()
      : first.charAt(0)}${first.slice(1, first.length)}${restItems.length && ', '}${restItems.join(', ')}`;
  }
}
