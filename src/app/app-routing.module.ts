import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreateComponent } from './tasks/create/create.component';
import { ListComponent } from './tasks/list/list.component';

const routes: Routes = [
  {path:'', component: ListComponent},
  {path:'create', component: CreateComponent, canActivate: [AuthGuard]},
  {path:'edit/:taskId', component: CreateComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
