import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseComponent } from './course/course.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { ReportComponent } from './report/report.component';
import { AddCourseComponent } from './course/add-course/add-course.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivateChild: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent, pathMatch: 'full' },
          { path: 'courses', component: CourseComponent },
          { path: 'course/add', component: AddCourseComponent },
          { path: 'users', component: UserComponent },
          { path: 'reports', component: ReportComponent },
          { path: 'messages', component: DashboardComponent },
          { path: 'notifications', component: DashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
