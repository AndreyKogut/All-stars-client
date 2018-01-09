import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../../../services/users.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces';

const STEP = 1;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.less']
})
export class UsersListComponent implements OnInit {
  count: number;
  skip: number;
  loading: boolean;
  users: User[] = [];
  constructor(private usersService: UsersService, private authService: AuthService) {}

  ngOnInit() {
    this.getUsers({ count: STEP * 2, skip: 0 });
  }

  getUsers({ count, skip }: { count: number, skip: number }) {
    this.loading = true;
    this.usersService.getUsers({ count, skip })
      .subscribe(
        (users: User[]) => {
          this.users = [...this.users, ...users];
          this.count = count;
          this.skip = skip;
          this.loading = false;
        },
        this.authService.requestErrorHandler(() => {
          this.getUsers.call(this, { count, skip });
        })
      );
  }

  loadMoreUsers() {
    this.getUsers({ count: this.count, skip: this.count });
  }

  loadingAvailable() {
    return this.users.length === this.count && !this.loading;
  }
}
