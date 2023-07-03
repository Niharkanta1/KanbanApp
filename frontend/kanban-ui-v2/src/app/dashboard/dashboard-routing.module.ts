import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WorkspaceResolverService } from '../shared/resolver/workspace-resolver.service';
import { WorkspaceComponent } from './workspace/workspace.component';
import { StageComponent } from './stage/stage.component';
import { BoardResolverService } from '../shared/resolver/board-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { workspaces: WorkspaceResolverService },
    children: [
      { path: '', component: WorkspaceComponent },
      {
        path: 'stage/:id',
        component: StageComponent,
        resolve: { board: BoardResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
