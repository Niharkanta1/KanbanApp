import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/shared/model/Board';
import { Workspace } from 'src/app/shared/model/Workspace';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent implements OnInit {
  workspace = {} as Workspace;
  boards = [] as Board[];
  constructor(commService: CommonService) {
    commService.selectedWorkspace$.subscribe((ws) => {
      this.workspace = ws;
      this.boards = ws.boards;
    });
  }

  ngOnInit(): void {}

  getInitials(nameString: string) {
    const fullName: string[] = nameString.split(' ');
    const initials = fullName.shift()?.charAt(0)! + fullName.pop()?.charAt(0);
    return initials.toUpperCase();
  }

  toggleDefault() {
    console.log('Toggle default workspace');
  }
}
