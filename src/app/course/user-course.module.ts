import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseDetailChapterComponent } from './course-detail/course-detail-chapter/course-detail-chapter.component';
import { CourseComponent } from './course.component';
import { MenuComponent } from './menu/menu.component';
import { UserCourseRoutingModule } from './user-course-routing.module';

@NgModule({
  declarations: [
    CourseDetailComponent,
    CourseDetailChapterComponent,
    CourseComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    UserCourseRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }]
})
export class UserCourseModule {}
