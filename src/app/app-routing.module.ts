import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { Get404Component } from './core/get404/get404.component';
import { RegisterComponent } from './register/register.component';
import { PracticeComponent } from './practice/practice.component';
import { RecordComponent } from './practice/record/record.component';
import { ExpertComponent } from './expert/expert.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './course/user-course.module#UserCourseModule',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'courses',
    loadChildren: './course/user-course.module#UserCourseModule'
  },
  { path: 'practices', component: PracticeComponent },
  { path: 'practices/:id', component: RecordComponent },
  { path: 'experts', component: ExpertComponent },
  { path: 'experts/:id', component: ExpertComponent },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: '**', component: Get404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
