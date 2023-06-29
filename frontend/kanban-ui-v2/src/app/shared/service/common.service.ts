import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { Workspace } from '../model/Workspace';

@Injectable({ providedIn: 'root' })
export class CommonService implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  menuToggle$ = new BehaviorSubject<boolean>(false);
  workspaces$ = new BehaviorSubject<Workspace[]>([]);
  selectedWorkspace$ = new BehaviorSubject<Workspace>({} as Workspace);
  clearBoardsFilter$ = new Subject<string>();

  workspaceCreated$ = new Subject<Workspace[]>();
}
