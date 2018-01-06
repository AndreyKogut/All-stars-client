import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  @ViewChild('form') formInstance: NgForm;

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.formInstance.reset();
  }
}
