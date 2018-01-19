import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersListComponent } from './routes/users-list/users-list.component';
import { UsersService } from '../../services';
import { UserProfileComponent } from './routes/user-profile/user-profile.component';
import { UserProfileEditComponent } from './routes/user-profile-edit/user-profile-edit.component';
import { UsernameDirectiveShareModule } from '../../shared-modules/username-directive.share.module';
import { ErrorToastShareModule } from '../../shared-modules/error-toast.share.module';
import { InputButtonsShareModule } from '../../shared-modules/input-buttons.share.module';
import { InterestsStrTransformPipe } from '../../pipes/interests-str-transform.pipe';
import { InfinitScrollDirective } from '../../directives/infinit-scroll.directive';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
  },
  {
    path: ':id',
    component: UserProfileComponent,
  },
  {
    path: ':id/edit',
    component: UserProfileEditComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsernameDirectiveShareModule,
    InputButtonsShareModule,
    ErrorToastShareModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [UsersService],
  declarations: [
    UsersListComponent,
    UserProfileComponent,
    UserProfileEditComponent,
    InterestsStrTransformPipe,
    InfinitScrollDirective,
  ],
})
export class UsersModule { }
