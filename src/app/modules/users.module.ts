import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UsersListComponent } from '../pages/users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
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
  declarations: [UsersListComponent],
})
export class UsersModule { }
