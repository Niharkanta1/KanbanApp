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
}
