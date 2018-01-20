import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AuthService } from './auth.service';
import { User } from '../interfaces';

@Injectable()
export class UsersService {
  errorsSub = new Subject;

  constructor(private authService: AuthService) {}

  getUsers({ skip, count }: { skip: number, count: number }): Observable<User[]> {
    return this.authService.sendRequest('get', `users?skip=${skip}&count=${count}`)
      .map((response: Response) => response.json());
  }

  getUser(id: string): Observable<User> {
    return this.authService.sendRequest('get', `users/${id}`)
      .map((response: Response) => response.json());
  }

  setUserData(data: { username?: string, about?: string }) {
    return this.authService.sendRequest('post', 'profile', data)
      .subscribe(
        () => {
          this.authService.setUserData(data);
        },
        this.authService.requestErrorHandler(
          this.setUserData.bind(this, data),
          (message) => {
          this.errorsSub.next(message);
        })
      );
  }

  setUserInterests(interests: string[]) {
    return this.authService.sendRequest('put', 'interests', { interests: interests })
      .subscribe(
        () => {
          this.authService.setUserData({ interests });
        },
        this.authService.requestErrorHandler(
          this.setUserInterests.bind(this, interests),
          (message) => {
          this.errorsSub.next(message);
        })
      );
  }
}
