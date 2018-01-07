import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { User } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable()
export class UsersService {
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
}
