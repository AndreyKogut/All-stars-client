import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions  } from '@angular/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { User } from '../interfaces';
import { environment } from '../../environments/environment';
import transformToPostDataBody from '../utils/transformToPostDataBody';
import { Observable } from 'rxjs/Observable';

const getRegistrationHeaders = () =>
  new Headers({
    'Authorization': `Basic ${environment.clientBasic}`,
    'Content-type': 'application/x-www-form-urlencoded',
});

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

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN, token);
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN, token);
  }

  isUserAuthorized(): Promise<boolean> {
    return Promise.resolve(!!this.getToken());
  }

  getAuthHeaders(mode?): Headers {
    return new Headers({
      'Authorization': `Bearer ${this.getToken()}`,
      ...(mode === 'post' ? {
        'Content-type': 'application/x-www-form-urlencoded',
      } : {}),
      ...(mode === 'multipart' ? {
        'Content-type': 'multipart/form-data',
      } : {}),
    });
  }

  sendRequest(method: string, url: string, body?: { [key: string]: string | string[] }): Observable<any> {
    if (method === 'get') {
      return this.http[method](
        `${environment.rootUrl}${url}`,
        new RequestOptions({ headers: this.getAuthHeaders(method) }),
      );
    }

    return this.http[method](
      `${environment.rootUrl}${url}`,
      method === 'post' ? transformToPostDataBody(body) : body,
      new RequestOptions({ headers: this.getAuthHeaders(method) }),
    );
  }

  handleSuccessTokensResponse(response: Response, withRedirect: boolean = true): void {
    const { access_token, refresh_token } = response.json();

    this.setToken(access_token);
    this.setRefreshToken(refresh_token);

    if (withRedirect) {
      this.router.navigate(['/users']);
    }
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

  requestErrorHandler(successCallback?: Function, errorCallback?: Function) {
    return (response: Response): void => {
      try {
        const { error } = response.json();
        if (error === 'invalid_token' && !!this.getRefreshToken()) {
          this.loginWithRefreshToken(successCallback);
        } else {
          if (errorCallback) {
            errorCallback(error);
          }
        }
      } catch (e) {
        const text = response.text();
        errorCallback(text);
      }
    };
  }

  setUserData(data: { [prop: string]: any }): void {
    this.user = { ...this.user, ...data };
    this.currentUserSub.next(this.user);
  }

  register(requestBody: { username, password, email }): void {
    this.http.post(
      `${environment.rootUrl}join`,
      transformToPostDataBody(requestBody),
      new RequestOptions({ headers: getRegistrationHeaders() }),
    ).subscribe(
      this.handleSuccessTokensResponse,
      this.handleLoginErrors,
    );
  }

  getCurrentUser(): void {
    this.sendRequest('get', 'profile').subscribe(
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
      new RequestOptions({ headers: getRegistrationHeaders() }),
    ).subscribe(
      this.handleSuccessTokensResponse,
      this.handleLoginErrors,
    );
  }

  loginWithRefreshToken(callback) {
    this.http.post(
      `${environment.rootUrl}oauth/refresh_token`,
      transformToPostDataBody({ refresh_token: this.getRefreshToken() }),
      new RequestOptions({ headers: getRegistrationHeaders() }),
    ).subscribe(
      (response: Response) => {
        this.handleSuccessTokensResponse(response, false);
        if (callback) {
          callback();
        }
      },
      () => {
        this.logout();
        this.router.navigate(['/sign-in']);
      }
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
