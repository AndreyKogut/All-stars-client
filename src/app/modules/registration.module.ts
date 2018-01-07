import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';

import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';
import {TransformUsernameDirective} from '../directives/transform-username.directive';
import { FormErrorComponent } from '../components/form-error/form-error.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
  exports: [
    RouterModule,
  ],
  declarations: [
    FormErrorComponent,
    SignInComponent,
    SignUpComponent,
    TransformUsernameDirective,
  ],
})
export class RegistrationModule { }
