import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { Get404Component } from './core/get404/get404.component';
import { RegisterComponent } from './register/register.component';
import { CourseComponent } from './course/course.component';
import { PracticeComponent } from './practice/practice.component';
import { RecordComponent } from './practice/record/record.component';

const routes: Routes = [
  { path: '', component: CourseComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'courses', component: CourseComponent },
  { path: 'practices', component: PracticeComponent },
  { path: 'practices/:id', component: RecordComponent },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: '**', component: Get404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
