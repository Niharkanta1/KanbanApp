import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/notifications/notifications.service';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css'],
})
export class LogoffComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    if (this.authService.doLogout()) {
      this.notificationService.addSuccess('Logout Successful');
      this.router.navigateByUrl('/');
    }
  }
}
