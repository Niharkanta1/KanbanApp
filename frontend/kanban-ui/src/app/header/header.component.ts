import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { CommonService } from '../shared/common.service';
import { User } from '../shared/model/User';
import { Workspace } from '../shared/model/Workspace';
import { WorkspaceService } from '../shared/services/workspace/workspace.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() menuState = new EventEmitter();

  workspaces: Workspace[] = [];
  loggedIn: boolean = false;
  currentUser: User;
  showMenu = false;
  constructor(public authService: AuthService,
    public workspaceService: WorkspaceService,
    public commonService: CommonService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.loggedIn = true;
      this.currentUser = this.authService.currentUser;
      this.getWorkspaces();
    }
    console.log("Header, workspaces::", this.workspaces);
  }

  loginCheck() {
    if (this.authService.currentUser) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    return this.loggedIn;
  }

  getWorkspaces() {
    this.workspaceService.getAllWorkspaces().subscribe(res => {
      this.workspaces = res;
    }, err => {
      console.log("Error::", err.error);
    });
  }

  logout() {
    console.log("logging out...")
    this.loggedIn = false;
    this.authService.doLogout();
  }

  toggleMenu() {
    this.loginCheck();
    if (!this.loggedIn) return;
    this.showMenu = !this.showMenu;
    this.menuState.emit(this.showMenu);
  }

  selectWorkspace(id: number) {
    console.log("Workspace selected::", id);
    this.commonService.setSelectedWorkspaceId(id);
  }

}
