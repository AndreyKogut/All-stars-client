import { NgModule } from '@angular/core';

import { TransformUsernameDirective } from '../directives/transform-username.directive';

@NgModule({
  declarations: [TransformUsernameDirective],
  exports: [TransformUsernameDirective],
})
export class UsernameDirectiveShareModule {}
