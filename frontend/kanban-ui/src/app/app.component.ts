import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kanban-ui';
  flag: boolean = false;
  constructor(public authService: AuthService) {}

  loginCheck() {
    return this.authService.isLoggedIn;
  }

  subMenuState:boolean = false;
  burgerClicked(evnt){
    this.subMenuState = evnt;
  }

  hideSideBar(value: boolean) {
    this.flag = value;
  }

}
