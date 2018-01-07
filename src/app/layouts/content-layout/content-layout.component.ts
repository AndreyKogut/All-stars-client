import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.less']
})
export class ContentLayoutComponent implements OnInit, OnDestroy {
  user: User;
  userSub: Subscription;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.user;
    this.userSub = this.authService.currentUserSub.subscribe((user: User) => {
      this.user = user;
    });
    this.authService.getCurrentUser();
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/sign-in']);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
