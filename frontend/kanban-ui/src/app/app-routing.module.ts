import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/auth.guard';
import { Workspace } from './shared/model/Workspace';
import { WelcomeComponent } from './welcome/welcome.component';
import { WorkspaceComponent } from './workspace/workspace.component';


const routes: Routes = [
  { path:'', redirectTo: '/welcome', pathMatch: 'full' },
  { path:'welcome', component:LoginComponent },
  { path:'login', component:LoginComponent },
  { path:'signup', component:SignupComponent },
  { path:'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path:'workspace', component: WorkspaceComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
