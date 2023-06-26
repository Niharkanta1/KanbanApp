import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { BoardsComponent } from './boards/boards.component';

@NgModule({
  declarations: [HomeComponent, WorkspaceComponent, BoardsComponent],
  imports: [CommonModule, DashboardRoutingModule],
  exports: [],
})
export class DashboardModule {}
