import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string;
  user: User;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.currentUser;
    if(this.user) {
      this.title = `Welcome ${this.user.firstName}`;
    }
  }



}
