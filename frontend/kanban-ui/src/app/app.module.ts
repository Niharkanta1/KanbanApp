import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './account/login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { SignupComponent } from './account/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { WelcomeComponent } from './welcome/welcome.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { BoardsComponent } from './workspace/boards/boards.component';
import { SettingsComponent } from './workspace/settings/settings.component';
import { MembersComponent } from './workspace/members/members.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateBoardDialogComponent } from './dialog/board/create-board-dialog/create-board-dialog.component';
import { CreateWorkspaceDialogComponent } from './dialog/workspace/create-workspace-dialog/create-workspace-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    HomeComponent,
    SignupComponent,
    WelcomeComponent,
    SideNavComponent,
    WorkspaceComponent,
    BoardsComponent,
    SettingsComponent,
    MembersComponent,
    CreateBoardDialogComponent,
    CreateWorkspaceDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [],
  entryComponents:  [CreateBoardDialogComponent, CreateWorkspaceDialogComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  { provide: MAT_DIALOG_DATA, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
