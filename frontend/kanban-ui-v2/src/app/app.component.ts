import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AuthStatus } from './shared/model/AuthStatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Kanban UI ver 2.0';
  signedin = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.signedin$.subscribe((result) => {
      this.signedin = result === 1 ? true : false;
    });
  }
}
