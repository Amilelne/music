import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseComponent } from './course/course.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { CourseListComponent } from './course/course-list/course-list.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { ReportComponent } from './report/report.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NotificationComponent } from './dashboard/notification/notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

registerLocaleData(en);

@NgModule({
  declarations: [
    DashboardComponent,
    CourseComponent,
    UserComponent,
    AdminComponent,
    CourseListComponent,
    AddCourseComponent,
    ReportComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgZorroAntdModule,
    NgxChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }]
})
export class AdminModule {}
