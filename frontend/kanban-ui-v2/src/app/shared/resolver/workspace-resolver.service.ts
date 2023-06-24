import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Workspace } from '../model/Workspace';
import { EMPTY, Observable, catchError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../service/user.service';
import { WorkspaceService } from 'src/app/dashboard/service/workspace.service';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceResolverService implements Resolve<Workspace[]> {
  constructor(private workspaceService: WorkspaceService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Workspace[] | Observable<Workspace[]> | Promise<Workspace[]> {
    return this.workspaceService.getAllWorkspaces().pipe(
      catchError(() => {
        console.log('Error while fetching workspaces for user');
        return EMPTY;
      })
    );
  }
}
