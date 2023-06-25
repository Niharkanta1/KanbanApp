import { Component, OnInit } from '@angular/core';
import { Workspace } from 'src/app/shared/model/Workspace';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent implements OnInit {
  workspace = {} as Workspace;
  constructor(commService: CommonService) {
    commService.selectedWorkspace$.subscribe((ws) => {
      this.workspace = ws;
    });
  }

  ngOnInit(): void {}
}
