import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envSettings } from 'src/app/env-settings';
import { Workspace } from '../../model/Workspace';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  endpoint: string = '/workspaces'

  constructor(private http: HttpClient) { }

  getAllWorkspaces() {
    return this.http.get<Workspace[]>(envSettings.apiUrl + this.endpoint);
  }

  getWorkspace(id:number) {
    return this.http.get<Workspace[]>(envSettings.apiUrl + this.endpoint);
  }

  createWorkspace(workspace: Workspace) {
    
  }

  updateWorkspace(workspace: Workspace) {

  }

  deleteWorkspace(id: number) {

  }

  patchWorkspace(workspace: Workspace) {

  }
}


