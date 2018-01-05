import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class CanActivateAppService implements CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {}

  canActivateChild(
    routeSnapshot: ActivatedRouteSnapshot,
    stateSnapshot: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isUserAuthorized()
      .then((isAuthorized: boolean) => {
        if (isAuthorized) {
          return true;
        } else {
          this.router.navigate(['/sign-in']);
        }
      });
  }
}
