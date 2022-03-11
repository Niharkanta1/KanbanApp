import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envSettings } from 'src/app/env-settings';
import { CommonService } from '../../common.service';
import { Workspace } from '../../model/Workspace';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  workspaces: Workspace[] = [];
  endpoint: string = `${envSettings.apiUrl}/workspaces`;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  getAllWorkspaces() {
    return this.http.get<Workspace[]>(this.endpoint);
  }

  getWorkspace(id:number) {
    return this.http.get<Workspace[]>(this.endpoint);
  }

  createWorkspace(workspace: Workspace) {
    return this.http.post<Workspace>(this.endpoint, workspace);
  }

  updateWorkspace(workspace: Workspace) {
    return this.http.put
  }

  deleteWorkspace(id: number) {

  }

  patchWorkspace(workspace: Workspace) {

  }

  loadWorkspacesForUSer(id: string) {
    console.log("Loading workspaces...", id)
    this.getAllWorkspaces().subscribe(response => {
      this.workspaces = response;
      console.log("Workspaces for user", this.workspaces);
      this.commonService.setSelectedWorkspaceId(this.workspaces[0].id);
    }, error => {
      console.log("Error Workspaces ===> ", error.error);
    })
  }
}


