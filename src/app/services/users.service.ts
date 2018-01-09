import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AuthService } from './auth.service';
import { User } from '../interfaces';
import { environment } from '../../environments/environment';
import transformToPostDataBody from '../utils/transformToPostDataBody';

@Injectable()
export class UsersService {
  errorsSub = new Subject;
  constructor(private authService: AuthService, private http: Http) {}

  getUsers({ skip, count }: { skip: number, count: number }): Observable<User[]> {
    return this.http.get(
      `${environment.rootUrl}users?skip=${skip}&count=${count}`,
      new RequestOptions({ headers: this.authService.getAuthHeaders() }),
    ).map((response: Response) => response.json());
  }

  getUser(id: string): Observable<User> {
    return this.http.get(
      `${environment.rootUrl}users/${id}`,
      new RequestOptions({ headers: this.authService.getAuthHeaders() }),
    ).map((response: Response) => response.json());
  }

  setUserData(data: { username?: string, about?: string }) {
    return this.http.post(
      `${environment.rootUrl}profile`,
      transformToPostDataBody(data),
      new RequestOptions({ headers: this.authService.getAuthHeaders('post') })
    ).subscribe(
      () => {
        this.authService.setUserData(data);
      },
      this.authService.requestErrorHandler(() => {
        this.setUserData.call(this, data);
      }, (message) => {
        this.errorsSub.next(message);
      })
    );
  }

  setUserInterests(interests: string[]) {
    return this.http.put(
      `${environment.rootUrl}interests`,
      { interests: interests },
      new RequestOptions({ headers: this.authService.getAuthHeaders() })
    ).subscribe(
      () => {
        this.authService.setUserData({ interests });
      },
      this.authService.requestErrorHandler(() => {
        this.setUserInterests.call(this, interests);
      }, (message) => {
        this.errorsSub.next(message);
      })
    );
  }
}
