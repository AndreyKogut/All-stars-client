import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';

import { SignInComponent } from './routes/sign-in/sign-in.component';
import { SignUpComponent } from './routes/sign-up/sign-up.component';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { UsernameDirectiveShareModule } from '../../shared-modules/username-directive.share.module';

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
    UsernameDirectiveShareModule,
  ],
  exports: [
    RouterModule,
  ],
  declarations: [
    FormErrorComponent,
    SignInComponent,
    SignUpComponent,
  ],
})
export class RegistrationModule { }
