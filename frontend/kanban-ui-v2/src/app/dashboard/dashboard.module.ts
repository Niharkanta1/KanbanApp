import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { BoardsComponent } from './boards/boards.component';
import { SharedModule } from '../shared/shared.module';
import { WorkspaceFormComponent } from './workspace-form/workspace-form.component';
import { WorkspaceAddComponent } from './workspace-add/workspace-add.component';
import { WorkspaceEditComponent } from './workspace-edit/workspace-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationsModule } from '../notifications/notifications.module';
import { BoardsAddComponent } from './boards-add/boards-add.component';
import { BoardsEditComponent } from './boards-edit/boards-edit.component';
import { BoardsFormComponent } from './boards-form/boards-form.component';
import { StageComponent } from './stage/stage.component';

@NgModule({
  declarations: [
    HomeComponent,
    WorkspaceComponent,
    BoardsComponent,
    WorkspaceFormComponent,
    WorkspaceAddComponent,
    WorkspaceEditComponent,
    BoardsAddComponent,
    BoardsEditComponent,
    BoardsFormComponent,
    StageComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
  exports: [WorkspaceAddComponent, WorkspaceFormComponent],
})
export class DashboardModule {}
