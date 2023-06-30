import { Component, Input, OnInit } from '@angular/core';
import { Workspace } from 'src/app/shared/model/Workspace';
import { WorkspaceService } from '../service/workspace.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';

@Component({
  selector: 'app-workspace-add',
  templateUrl: './workspace-add.component.html',
  styleUrls: ['./workspace-add.component.css'],
})
export class WorkspaceAddComponent implements OnInit {
  @Input() buttonType = '';
  @Input() action = '';
  showModal: boolean = false;

  workspace: Workspace = {
    id: -1,
    name: '',
    description: '',
    category: '',
    shortName: '',
    website: '',
    boards: [],
    isDefault: false,
  };

  constructor(
    private workspaceService: WorkspaceService,
    private notificationService: NotificationsService,
    private commService: CommonService
  ) {}

  ngOnInit(): void {}

  createWorkspace(workspace: Workspace) {
    this.workspaceService.createWorkspace(workspace).subscribe((res) => {
      this.showModal = false;
      this.notificationService.addSuccess('Workspace created successfully');
      this.workspaceService.getAllWorkspaces().subscribe((res) => {
        this.commService.workspaces$.next(res);
      });
    });
  }
}
