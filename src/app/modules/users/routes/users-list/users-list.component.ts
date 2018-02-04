import { Component, OnInit } from '@angular/core';

import { UsersService, AuthService } from '../../../../services';
import { User } from '../../../../interfaces';

const STEP = 20;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.less']
})
export class UsersListComponent implements OnInit {
  skip = 0;
  loading: boolean;
  users: User[] = [];
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.usersService.getUsers({ count: STEP, skip: this.skip })
      .subscribe(
        (users: User[]) => {
          this.users = [...this.users, ...users];
          this.skip = this.skip + STEP;
          this.loading = false;
        }
      );
  }

  loadMoreUsers() {
    this.getUsers();
  }

  loadingAvailable() {
    return this.users.length === this.skip && !this.loading;
  }
}
