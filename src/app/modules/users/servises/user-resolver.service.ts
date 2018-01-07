import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { User } from '../../../interfaces';
import { UsersService } from '../../../services/users.service';

@Injectable()
export class UserResolverService implements Resolve<User> {
  constructor(private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.usersService.getUser(route.params.id);
  }
}
