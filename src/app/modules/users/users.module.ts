import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UsersListComponent } from './routes/users-list/users-list.component';
import { UsersService } from '../../services/users.service';
import { UserProfileComponent } from './routes/user-profile/user-profile.component';
import { UserProfileEditComponent } from './routes/user-profile-edit/user-profile-edit.component';
import { UserResolverService } from './servises/user-resolver.service';

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
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [UsersService, UserResolverService],
  declarations: [UsersListComponent, UserProfileComponent, UserProfileEditComponent],
})
export class UsersModule { }
