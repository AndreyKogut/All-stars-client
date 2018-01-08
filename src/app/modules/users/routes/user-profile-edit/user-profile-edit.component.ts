import * as R from 'ramda';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from '../../../../interfaces';
import { AuthService } from '../../../../services/auth.service';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.less']
})
export class UserProfileEditComponent implements OnInit {
  @ViewChild('form') formInstance: NgForm;
  user: User;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.user = this.authService.user;
    this.authService.currentUserSub.subscribe((user: User) => this.user = user);
  }

  onSave(propName: string) {
    this.usersService.setUserData({ [propName]: this.formInstance.value[propName].trim() });
  }

  onCancel(propName: string) {
    this.formInstance.form.patchValue({ [propName]: this.user[propName] });
  }
}
