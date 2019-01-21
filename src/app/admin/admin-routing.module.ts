import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { ReportComponent } from './report/report.component';

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
          {
            path: 'course',
            loadChildren: './course/course.module#CourseModule'
          },
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
