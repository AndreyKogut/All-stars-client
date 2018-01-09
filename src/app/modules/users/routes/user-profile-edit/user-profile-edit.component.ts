import * as R from 'ramda';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../../../../interfaces';
import { AuthService } from '../../../../services/auth.service';
import { UsersService } from '../../../../services/users.service';

const getFormInterestsArray = (interests: string[]) => new FormArray(
  interests.map((interest: string) => new FormControl(interest)),
);

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.less']
})
export class UserProfileEditComponent implements OnInit, OnDestroy {
  formInstance: FormGroup;
  subs: Subscription[];
  user: User;
  error: string;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.user = this.authService.user;
    this.initForm(this.user);
    const userSub = this.authService.currentUserSub.subscribe((user: User) => {
      this.user = user;
      this.initForm(user);
    });
    const errorSub = this.usersService.errorsSub.subscribe((message: string) => {
      this.error = message;
      setTimeout(() => { this.error = null; }, 3000);
    });
    this.subs = [userSub, errorSub];
  }

  initForm(user = { username: '', about: '', interests: [] }) {
    this.formInstance = new FormGroup({
      username: new FormControl(user.username),
      about: new FormControl(user.about),
      interests: getFormInterestsArray(user.interests),
    });
  }

  addInterest() {
    (<FormArray>this.formInstance.get('interests')).insert(0, new FormControl());
  }

  onSave(propName: string) {
    this.error = null;
    this.usersService.setUserData({ [propName]: this.formInstance.value[propName] });
  }

  onCancel(propName: string) {
    this.error = null;

    this.formInstance.patchValue({ [propName]: this.user[propName] });
    if (propName === 'interests') {
      this.formInstance.setControl(propName, getFormInterestsArray(this.user.interests));
    }
  }

  setInterests() {
    this.usersService.setUserInterests(this.formInstance.value.interests);
  }

  onRemove(i) {
    (<FormArray>this.formInstance.get('interests')).removeAt(i);
  }

  onMove(i, control, direction) {
    const arrayInstance = (<FormArray>this.formInstance.get('interests'));

    arrayInstance.removeAt(i);
    const arrayLength = this.formInstance.value.interests.length;

    if (i + direction > arrayLength) {
      // last -> first
      arrayInstance.insert(0, control);
    }

    if (i + direction < 0) {
      // first -> last
      arrayInstance.insert(arrayLength, control);
    }

    if ((i + direction >= 0) && (i + direction <= arrayLength)) {
      // normal move
      arrayInstance.insert(i + direction, control);
    }
  }

  isVisible(prop) {
    const formValue = this.formInstance.value[prop];

    return formValue && !R.equals(formValue, this.user[prop]);
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
