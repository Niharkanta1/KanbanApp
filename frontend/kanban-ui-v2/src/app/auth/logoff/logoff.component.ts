import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css'],
})
export class LogoffComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.doLogout()) {
      setTimeout(() => {
        this.router.navigateByUrl('/');
      }, 1000);
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
