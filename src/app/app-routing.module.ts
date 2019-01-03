import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { Get404Component } from './core/get404/get404.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: '**', component: Get404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
