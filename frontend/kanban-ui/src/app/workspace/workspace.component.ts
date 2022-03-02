import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../shared/common.service';
import { Workspace } from '../shared/model/Workspace';
import { WorkspaceService } from '../shared/services/workspace/workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
  currentWorkspaceId: number;
  workspaces: Workspace[] = [];
  currentWorkspace: Workspace;
  subscription: Subscription;

  constructor(public workspaceService: WorkspaceService, public commonService: CommonService) { 
    this.subscription = this.commonService.getSelectedWorkspaceId().subscribe(id => {
      if (id) {
        this.currentWorkspaceId = id;
      }
    });

    this.workspaceService.getAllWorkspaces().subscribe(response => {
      this.workspaces = response;
    }, error => {
      console.log("Error Workspaces ===> ", error.error);
    })
    if (this.currentWorkspaceId && this.workspaces.length > 0) {
      this.workspaces.forEach(
        function (value) {
          if (value.id === this.currentWorkspaceId) {
            this.currentWorkspace = value;
          }
        }
      );
    }

    console.log("Workspace::", this.currentWorkspaceId, this.currentWorkspace);
  }

  ngOnInit() { }

}
