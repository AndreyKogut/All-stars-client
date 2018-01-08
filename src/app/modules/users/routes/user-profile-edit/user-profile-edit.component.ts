import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../../../../interfaces';
import { AuthService } from '../../../../services/auth.service';
import { UsersService } from '../../../../services/users.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.less']
})
export class UserProfileEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') formInstance: NgForm;
  subs: Subscription[];
  user: User;
  error: string;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.user = this.authService.user;
    const userSub = this.authService.currentUserSub.subscribe((user: User) => this.user = user);
    const errorSub = this.usersService.errorsSub.subscribe((message: string) => {
      this.error = message;
      setTimeout(() => { this.error = null; }, 3000);
    });
    this.subs = [userSub, errorSub];
  }

  onSave(propName: string) {
    this.error = null;
    this.usersService.setUserData({ [propName]: this.formInstance.value[propName].trim() });
  }

  onCancel(propName: string) {
    this.error = null;
    this.formInstance.form.patchValue({ [propName]: this.user[propName] });
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
