import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { AppRoutesModule } from './modules/app-routes.module';
import { AuthService, WebsocketService, ChatsService } from './services';
import { CanActivateRegistrationService } from './layouts/registration-layout/services/can-activate-registration.service';
import { CanActivateAppService } from './layouts/content-layout/services/can-activate-app.service';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { RegistrationLayoutComponent } from './layouts/registration-layout/registration-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ContentLayoutComponent,
    RegistrationLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpModule,
    BrowserAnimationsModule,
  ],
  providers: [
    CanActivateRegistrationService,
    CanActivateAppService,
    AuthService,
    ChatsService,
    WebsocketService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
