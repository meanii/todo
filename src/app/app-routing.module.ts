import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './tasks/create/create.component';
import { ListComponent } from './tasks/list/list.component';

const routes: Routes = [
  {path:'', component: ListComponent},
  {path:'create', component: CreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
