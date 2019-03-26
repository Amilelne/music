import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user.component';
import { MenuComponent } from './menu/menu.component';
import { HistoryComponent } from './history/history.component';
import { AudioComponent } from './audio/audio.component';
import { ScoreComponent } from './score/score.component';

@NgModule({
  declarations: [UserComponent, ProfileComponent, MenuComponent, HistoryComponent, AudioComponent, ScoreComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }]
})
export class UserModule {}
