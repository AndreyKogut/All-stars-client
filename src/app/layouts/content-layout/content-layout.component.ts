import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.less']
})
export class ContentLayoutComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/sign-in']);
  }
}
