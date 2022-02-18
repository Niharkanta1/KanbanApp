import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {path:'welcome', component:WelcomeComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
