import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  loginCheck(): boolean {
    return this.authService.isLoggedIn;
  }

  logout() {
    console.log("logging out...")
    this.authService.doLogout();
  } 

}
