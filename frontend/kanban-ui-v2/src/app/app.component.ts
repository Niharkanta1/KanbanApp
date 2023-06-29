import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AuthStatus } from './shared/model/AuthStatus';
import { CommonService } from './shared/service/common.service';
import { Workspace } from './shared/model/Workspace';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Kanban UI ver 2.0';
  signedin = false;
  show = false;
  menuButtonPressed = false;
  workspacesSubmenuVisible = false;
  workspaces: Workspace[] = [];
  selectedWS = {} as Workspace;

  constructor(
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private commService: CommonService
  ) {
    commService.workspaces$.subscribe((result) => {
      this.workspaces = result;
      console.log('Workspaces in Header::', this.workspaces.length);
    });
    commService.selectedWorkspace$.subscribe((ws) => {
      this.selectedWS = ws;
    });
  }

  ngOnInit(): void {
    this.authService.signedin$.subscribe((result) => {
      if (this.authService.isLoggedIn) {
        this.signedin = true;
      } else {
        this.signedin = result === 1 ? true : false;
      }
      console.log('Signedin::', this.signedin);
    });
  }

  // ngIf - Expression has changed after it was checked - Issue Fix
  ngAfterViewChecked() {
    let show = this.signedin;
    if (show != this.show) {
      // check if it change, tell CD update view
      this.show = show;
      this.cdRef.detectChanges();
    }
  }

  canRenderWorkspacesList() {
    return this.signedin && this.workspaces.length >= 1;
  }

  onMenuButtonClick() {
    if (!this.signedin) return;
    this.menuButtonPressed = !this.menuButtonPressed;
    this.commService.menuToggle$.next(this.menuButtonPressed);
  }
}
