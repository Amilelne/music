import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseListComponent } from './course-list/course-list.component';

/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminCourseDetailComponent } from './admin-course-detail/admin-course-detail.component';
import { AdminCourseDetailContentComponent } from './admin-course-detail/admin-course-detail-content/admin-course-detail-content.component';
import { AddPracticeComponent } from './add-practice/add-practice.component';

@NgModule({
  declarations: [
    CourseComponent,
    AddCourseComponent,
    CourseListComponent,
    AdminCourseDetailComponent,
    AdminCourseDetailContentComponent,
    AddPracticeComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }]
})
export class CourseModule {}
