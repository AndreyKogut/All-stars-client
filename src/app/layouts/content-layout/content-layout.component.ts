import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService, ChatsService } from '../../services';
import { User } from '../../interfaces';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class ContentLayoutComponent implements OnInit, OnDestroy {
  user: User;
  subs: Subscription[];

  constructor(public authService: AuthService, private chatsService: ChatsService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.user;

    const userSub = this.authService.currentUserSub.subscribe((user: User) => {
      this.user = user;
    });
    const chatsSub = this.chatsService.messages.subscribe((message) => {
      console.log(message);
    });

    this.subs = [userSub, chatsSub];

    this.authService.getCurrentUser();
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/sign-in']);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
