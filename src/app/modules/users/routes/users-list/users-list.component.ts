import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../../../services/users.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces';

const STEP = 10;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.less']
})
export class UsersListComponent implements OnInit {
  count: number;
  skip: number;
  users: User[] = [];
  constructor(private usersService: UsersService, private authService: AuthService) {
    this.getUsers = this.getUsers.bind(this);
  }

  ngOnInit() {
    this.getUsers({ count: STEP * 2, skip: 0 });
  }

  getUsers({ count, skip }: { count: number, skip: number }) {
    this.usersService.getUsers({ count, skip })
      .subscribe(
        (users: User[]) => { this.users = users; this.count = count; this.skip = skip; },
        this.authService.requestErrorHandler(() => {
          this.getUsers({ count, skip });
        })
      );
  }

}
