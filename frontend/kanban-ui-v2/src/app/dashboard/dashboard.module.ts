import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { BoardsComponent } from './boards/boards.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, WorkspaceComponent, BoardsComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
  exports: [],
})
export class DashboardModule {}
