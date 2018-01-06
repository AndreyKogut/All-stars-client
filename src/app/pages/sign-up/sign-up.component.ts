import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {
  @ViewChild('form') formInstance: NgForm;

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.formInstance.reset();
  }
}
