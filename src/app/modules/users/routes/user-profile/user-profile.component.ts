import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../../../interfaces';
import { AuthService, UsersService } from '../../../../services';

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
  ) {}

  ngOnInit() {
    this.route.params.subscribe(({ id }) => {
      this.setUser(id);
    });
  }

  setUser(id) {
    this.usersService.getUser(id)
      .subscribe(
        (user: User) => {
          this.user = user; this.editable = this.authService.user._id === id;
        },
        this.authService.requestErrorHandler(() => { this.setUser.call(this, id); }),
      );
  }
}
