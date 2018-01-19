import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../../../services';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit, OnDestroy {
  @ViewChild('form') formInstance: NgForm;
  errorSubscription: Subscription;
  loading: Boolean;
  error = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.errorSubscription = this.authService.errors.subscribe((error: string) => {
      this.error = error;
      this.loading = false;
      setTimeout(() => {
        this.error = '';
      }, 4000);
    });
  }

  onSubmit() {
    this.authService.register(this.formInstance.value);
    this.loading = true;
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
