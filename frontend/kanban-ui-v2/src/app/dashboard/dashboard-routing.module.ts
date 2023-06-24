import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WorkspaceResolverService } from '../shared/resolver/workspace-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { workspaces: WorkspaceResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
