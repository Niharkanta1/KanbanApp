import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { CreateBoardDialogComponent } from '../dialog/board/create-board-dialog/create-board-dialog.component';
import { CreateWorkspaceDialogComponent } from '../dialog/workspace/create-workspace-dialog/create-workspace-dialog.component';
import { AuthService } from '../shared/auth.service';
import { CommonService } from '../shared/common.service';
import { Board } from '../shared/model/Board';
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
  isLoogedOut: boolean = true;
  currentUser: User;
  currentUsername: string;
  currentWorkspace: Workspace;
  showMenu = false;
  board: Board;
  workspace: Workspace;

  constructor(public authService: AuthService,
    public workspaceService: WorkspaceService,
    public commonService: CommonService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.isLoogedOut = true;
    this.authService.getLoggedInName.subscribe(user => {
      if(typeof user === 'string') {
        this.currentUsername = user;
      }
    });
    this.authService.loggedOutEvent.subscribe(result => {
      if(typeof result === 'boolean') {
        this.isLoogedOut = result;
      }
    })
  }

  initializeData() {
    if (this.currentUsername === 'undefined' || this.currentUsername !== 'Sign In') {
      this.loggedIn = true;
      this.currentUser = this.authService.currentUser;
      this.getWorkspaces();
    }
    console.log("Header, workspaces::", this.workspaces);
  }

  loginCheck() {
    if (this.authService.isLoggedIn) {
      this.loggedIn = true;
      this.isLoogedOut = false;
    } else {
      this.loggedIn = false;
      this.isLoogedOut = true;
    }
    return this.loggedIn;
  }

  getWorkspaces() {
    if(!this.loggedIn) return;
    console.log("Fetching workspaces.....")
    this.workspaceService.getAllWorkspaces().subscribe(res => {
      this.workspaces = res;
      this.currentWorkspace = this.workspaces[0];
      this.selectDefaultWorkspace();
    }, err => {
      console.log("Error::", err.error);
    });
  }

  logout() {
    console.log("logging out...");
    this.isLoogedOut = true;
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
    if(!this.loggedIn) return;
    console.log("Workspace selected::", id);
    this.commonService.setSelectedWorkspaceId(id);
  }

  selectDefaultWorkspace() {
    if(!this.loggedIn) return;
    console.log("Default Workspace selected::", this.currentWorkspace.id);
    this.commonService.setSelectedWorkspaceId(this.currentWorkspace.id);
  }

  openCreateBoardDialog(): void {
    if(!this.loggedIn) return;
    const dialogRef = this.dialog.open(CreateBoardDialogComponent, {
      width: '500px',
      data: this.board,
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.board = result;
      if (this.board)
        this.createBoard(this.board);
    });
  }

  openCreateWorkspaceDialog(): void {
    if(!this.loggedIn) return;
    const dialogRef = this.dialog.open(CreateWorkspaceDialogComponent, {
      width: '500px',
      data: this.board,
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.workspace = result;
      if (this.workspace)
        this.createWorkspace(this.workspace);
    });
  }

  createBoard(board: Board) {
    console.log("Creating board::", board);
  }

  createWorkspace(workspace: Workspace) {
    console.log("Creating workspace:", workspace);
  }



}
