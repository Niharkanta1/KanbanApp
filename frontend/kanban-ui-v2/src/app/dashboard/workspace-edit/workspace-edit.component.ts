import { Component, Input, OnInit } from '@angular/core';
import { Workspace } from 'src/app/shared/model/Workspace';
import { WorkspaceService } from '../service/workspace.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';

@Component({
  selector: 'app-workspace-edit',
  templateUrl: './workspace-edit.component.html',
  styleUrls: ['./workspace-edit.component.css'],
})
export class WorkspaceEditComponent implements OnInit {
  showModal: boolean = false;
  @Input() workspace!: Workspace;
  constructor(
    private workspaceService: WorkspaceService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {}

  updateWorkspace(workspace: Workspace) {
    workspace.id = this.workspace.id;
    this.workspaceService.updateWorkspace(workspace).subscribe(() => {
      this.showModal = false;
      this.notificationService.addSuccess('Workspace created successfully');
    });
  }
}
