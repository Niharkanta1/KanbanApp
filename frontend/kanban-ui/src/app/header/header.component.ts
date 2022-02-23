import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() menuState = new EventEmitter();
  showMenu = false;
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

  toggleMenu() {
    if(!this.loginCheck()) return;
    this.showMenu = !this.showMenu;
    this.menuState.emit(this.showMenu);
 }

}
