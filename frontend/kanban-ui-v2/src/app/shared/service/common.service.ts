import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Workspace } from '../model/Workspace';

@Injectable({ providedIn: 'root' })
export class CommonService implements OnInit {
  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  menuToggle$ = new BehaviorSubject<boolean>(false);
  setMenuToggle(val: boolean) {
    this.menuToggle$.next(val);
  }

  workspaces$ = new BehaviorSubject<Workspace[]>([]);
  setWorkspaces(workspaces: Workspace[]) {
    this.workspaces$.next(workspaces);
  }

  selectedWorkspace$ = new BehaviorSubject<Workspace>({} as Workspace);
  setSelectedWorkspace(workspace: Workspace) {
    this.selectedWorkspace$.next(workspace);
  }
}
