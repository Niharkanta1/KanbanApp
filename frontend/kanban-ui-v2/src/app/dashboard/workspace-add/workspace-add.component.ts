import { Component, Input, OnInit } from '@angular/core';
import { Workspace } from 'src/app/shared/model/Workspace';
import { WorkspaceService } from '../service/workspace.service';

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

  constructor(private workspaceService: WorkspaceService) {}

  ngOnInit(): void {}

  createWorkspace(workspace: Workspace) {
    this.workspaceService.createWorkspace(workspace).subscribe(() => {
      this.showModal = false;
    });
  }
}
