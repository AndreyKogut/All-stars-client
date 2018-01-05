import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { CanActivateRegistrationService } from '../services/can-activate-registration.service';
import { CanActivateAppService } from '../services/can-activate-app.service';
import { ContentLayoutComponent } from '../layouts/content-layout/content-layout.component';
import { RegistraionLayoutComponent } from '../layouts/registraion-layout/registraion-layout.component';

const appRoutes: Routes = [
  {
    path: '',
    component: RegistraionLayoutComponent,
    loadChildren: './registration.module#RegistrationModule',
    canActivateChild: [CanActivateRegistrationService],
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      { path: '', redirectTo: '/detail', pathMatch: 'full' },
      {
        path: 'users',
        loadChildren: './users.module#UsersModule',
        canActivateChild: [CanActivateAppService],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutesModule {}
