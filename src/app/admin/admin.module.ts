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

registerLocaleData(en);

@NgModule({
  declarations: [
    DashboardComponent,
    CourseComponent,
    UserComponent,
    AdminComponent
  ],
  imports: [CommonModule, AdminRoutingModule, NgZorroAntdModule],
  providers: [{ provide: NZ_I18N, useValue: en_US }]
})
export class AdminModule {}
