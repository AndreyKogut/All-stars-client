import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit, OnDestroy {
  @ViewChild('form') formInstance: NgForm;
  errorSubscription: Subscription;
  loading: Boolean;
  error = '';

  constructor(public authService: AuthService) {
  }

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
    // this.authService.loginWithRefreshToken();
    this.authService.login(this.formInstance.value);
    this.loading = true;
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
