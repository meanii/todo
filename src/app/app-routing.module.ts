import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CreateComponent } from './tasks/create/create.component';
import { ListComponent } from './tasks/list/list.component';

const routes: Routes = [
  {path:'', component: ListComponent},
  {path:'create', component: CreateComponent, canActivate: [AuthGuard]},
  {path:'edit/:taskId', component: CreateComponent, canActivate: [AuthGuard]},
  {path: 'auth', loadChildren : () => import('src/app/auth/auth.module').then(m => m.AuthModule)},
  // {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
