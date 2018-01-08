import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersListComponent } from './routes/users-list/users-list.component';
import { UsersService } from '../../services/users.service';
import { UserProfileComponent } from './routes/user-profile/user-profile.component';
import { UserProfileEditComponent } from './routes/user-profile-edit/user-profile-edit.component';
import { UsernameDirectiveShareModule } from '../../shared-modules/username-directive.share.module';
import { ErrorToastShareModule } from '../../shared-modules/error-toast.share.module';
import { InputButtonsShareModule } from '../../shared-modules/input-buttons.share.module';

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
  ],
})
export class UsersModule { }
