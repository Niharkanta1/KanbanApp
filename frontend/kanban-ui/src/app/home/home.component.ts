import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { CommonService } from '../shared/common.service';
import { User } from '../shared/model/User';
import { Workspace } from '../shared/model/Workspace';
import { WorkspaceService } from '../shared/services/workspace/workspace.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Output() welcomePageLoadEvent = new EventEmitter<boolean>();
  title: string;
  user: User;
  workspaces: Workspace[] = [];

  constructor(public authService: AuthService) { }

  ngOnInit() {
    console.log("Loading Home.....")
    this.user = this.authService.currentUser;
    if(this.user) {
      this.title = `Welcome ${this.user.firstName}`;
      this.welcomePageLoadEvent.emit(false);
    }   
  }



}
