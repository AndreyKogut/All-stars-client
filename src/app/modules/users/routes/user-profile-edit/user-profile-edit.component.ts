import { Component, OnInit } from '@angular/core';
import { User } from '../../../../interfaces';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.less']
})
export class UserProfileEditComponent implements OnInit {
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
        (user: User) => { this.user = user; },
        this.authService.requestErrorHandler(() => { this.setUser(id); }),
      );
  }
}
