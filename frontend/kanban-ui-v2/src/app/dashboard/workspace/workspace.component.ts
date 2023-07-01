import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/shared/model/Board';
import { Workspace } from 'src/app/shared/model/Workspace';
import { CommonService } from 'src/app/shared/service/common.service';
import { WorkspaceService } from '../service/workspace.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent implements OnInit {
  workspace = {} as Workspace;
  boards = [] as Board[];
  constructor(
    private commService: CommonService,
    private workspaceService: WorkspaceService,
    private notificationService: NotificationsService
  ) {
    commService.selectedWorkspace$.subscribe((ws) => {
      this.workspace = ws;
      this.boards = ws.boards;
    });
  }

  ngOnInit(): void {
    this.commService.onBoardAdd$.subscribe((res) => {
      this.boards = res;
      this.workspace.boards = this.boards;
    });
  }

  getInitials(nameString: string) {
    const fullName: string[] = nameString.split(' ');
    const initials = fullName.shift()?.charAt(0)! + fullName.pop()?.charAt(0);
    return initials.toUpperCase();
  }

  makeDefault() {
    console.log('Making workspace default.');
    this.workspaceService.makeDefault(this.workspace.id).subscribe(
      (res) => {
        this.workspace = res;
        this.workspaceService.getAllWorkspaces().subscribe((result) => {
          this.commService.workspaces$.next(result);
        });
        this.notificationService.addSuccess('Workspace updated successfully.');
      },
      (err) => {
        this.notificationService.addError('Workspace update failed.');
      }
    );
  }
}
