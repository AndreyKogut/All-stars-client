import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppRoutesModule } from './modules/app-routes.module';
import { AuthService } from './services/auth.service';
import { CanActivateRegistrationService } from './services/can-activate-registration.service';
import { CanActivateAppService } from './services/can-activate-app.service';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { RegistraionLayoutComponent } from './layouts/registraion-layout/registraion-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ContentLayoutComponent,
    RegistraionLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpModule,
  ],
  providers: [CanActivateRegistrationService, CanActivateAppService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
