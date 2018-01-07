import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions  } from '@angular/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { User } from '../interfaces';
import { environment } from '../../environments/environment';
import transformToPostDataBody from '../utils/transformToPostDataBody';

@Injectable()
export class AuthService {
  private TOKEN = 'token';
  private REFRESH_TOKEN = 'refresh_token';
  errors = new Subject;
  currentUserSub = new Subject;
  user: User;

  constructor(private http: Http, private router: Router) {
    this.handleLoginErrors = this.handleLoginErrors.bind(this);
    this.handleSuccessTokensResponse = this.handleSuccessTokensResponse.bind(this);
    this.requestErrorHandler = this.requestErrorHandler.bind(this);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN);
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN, token);
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  setRefreshToken(token: string) {
    localStorage.setItem(this.REFRESH_TOKEN, token);
  }

  isUserAuthorized() {
    return Promise.resolve(!!this.getToken());
  }

  getAuthHeaders() {
    return new Headers({
      'Authorization': `Bearer ${this.getToken()}`,
    });
  }

  getRegistrationHeaders() {
    return new Headers({
      'Authorization': `Basic ${environment.clientBasic}`,
      'Content-type': 'application/x-www-form-urlencoded',
    });
  }

  handleSuccessTokensResponse(response: Response) {
    const { access_token, refresh_token} = response.json();

    this.setToken(access_token);
    this.setRefreshToken(refresh_token);

    this.router.navigate(['/users']);
  }

  handleLoginErrors(error: Response) {
    try {
      const body = error.json();
      this.errors.next(body.error_description);
    } catch (_) {
      const errorText = error.text();
      this.errors.next(errorText);
    }
  }

  requestErrorHandler(callback: Function) {
    return (response: Response) => {
      const { error } = response.json();
      if (error === 'invalid_token' && !!this.getRefreshToken()) {
        this.loginWithRefreshToken(callback);
      } else {
        this.router.navigate(['/sign-in']);
      }
    };
  }

  register(requestBody: { username, password, email }) {
    this.http.post(
      `${environment.rootUrl}join`,
      transformToPostDataBody(requestBody),
      new RequestOptions({ headers: this.getRegistrationHeaders() }),
    ).subscribe(
      this.handleSuccessTokensResponse,
      this.handleLoginErrors,
    );
  }

  getCurrentUser() {
    return this.http.get(`${environment.rootUrl}users/profile`, {
      headers: this.getAuthHeaders(),
    }).subscribe(
      (response: Response) => {
        const user = response.json();
        this.currentUserSub.next(user);
        this.user = user;
      },
      this.requestErrorHandler(this.getCurrentUser.bind(this)),
    );
  }

  login(requestBody: { username, password }) {
    this.http.post(
      `${environment.rootUrl}oauth/token`,
      transformToPostDataBody(requestBody),
      new RequestOptions({ headers: this.getRegistrationHeaders() }),
    ).subscribe(
      this.handleSuccessTokensResponse,
      this.handleLoginErrors,
    );
  }

  loginWithRefreshToken(callback) {
    this.http.post(
      `${environment.rootUrl}oauth/refresh_token`,
      transformToPostDataBody({ refresh_token: this.getRefreshToken() }),
      new RequestOptions({ headers: this.getRegistrationHeaders() }),
    ).subscribe(
      (response: Response) => {
        this.handleSuccessTokensResponse(response);
        if (callback) {
          callback();
        }
      },
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
