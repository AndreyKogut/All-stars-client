import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../../../interfaces';
import { AuthService } from '../../../../services/auth.service';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
  editable: Boolean = false;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private usersService: UsersService
  ) {
    this.setUser = this.setUser.bind(this);
  }

  ngOnInit() {
    this.route.params.subscribe(({ id }) => {
      this.setUser(id);
    });
  }

  setUser(id) {
    this.usersService.getUser(id)
      .subscribe(
        (user: User) => { this.user = user; this.editable = this.user._id === id; },
        this.authService.requestErrorHandler(() => { this.setUser(id); }),
      );
  }
}
