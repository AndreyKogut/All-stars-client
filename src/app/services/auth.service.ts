import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private isAuthorized = false;

  isUserAuthorized() {
    return new Promise(resolve => resolve(this.isAuthorized));
  }

  login() {
    this.isAuthorized = true;
  }

  logout() {
    this.isAuthorized = false;
  }
}
