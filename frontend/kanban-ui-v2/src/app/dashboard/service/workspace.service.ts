import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envSettings } from 'src/app/env-settings';
import { Workspace } from 'src/app/shared/model/Workspace';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  workspaceApi = `${envSettings.apiUrl}/workspaces`;
  constructor(private http: HttpClient) {}

  getAllWorkspaces() {
    return this.http.get<Workspace[]>(this.workspaceApi);
  }

  createWorkspace(workspace: Workspace) {
    return this.http.post<Workspace>(this.workspaceApi, workspace);
  }

  updateWorkspace(workspace: Workspace) {
    return this.http.patch<Workspace>(
      `${this.workspaceApi}/${workspace.id}`,
      workspace
    );
  }
}
