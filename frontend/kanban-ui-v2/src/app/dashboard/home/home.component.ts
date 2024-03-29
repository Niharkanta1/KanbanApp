import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/shared/model/Board';
import { Workspace } from 'src/app/shared/model/Workspace';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sidebarVisible: boolean = false;
  workspaces = [] as Workspace[];
  selectedWorkspace = {} as Workspace;
  boards = [] as Board[];

  constructor(
    private commService: CommonService,
    private route: ActivatedRoute
  ) {
    commService.menuToggle$.subscribe((val) => {
      this.sidebarVisible = val;
    });
    this.route.data.subscribe(({ workspaces }) => {
      this.updateWorkspaces(workspaces);
    });
    this.commService.workspaceCreated$.subscribe((workspaces) =>
      this.updateWorkspaces(workspaces)
    );
  }

  updateWorkspaces(workspaces: Workspace[]) {
    console.log('in home:', workspaces);
    this.workspaces = workspaces;
    this.selectedWorkspace = this.fetchDefaultWorkspace();
    this.commService.workspaces$.next(this.workspaces);
    this.commService.selectedWorkspace$.next(this.selectedWorkspace);
  }

  ngOnInit(): void {
    console.log('Home initialization....', this.workspaces.length);
    console.log('Selected Workspace::', this.selectedWorkspace);
  }

  fetchDefaultWorkspace(): Workspace {
    return this.workspaces.find((item) => item.isDefault)!;
  }
}
