import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { Get404Component } from "./core/get404/get404.component";
import { NgZorroAntdModule, NZ_I18N, zh_CN } from "ng-zorro-antd";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";
import { GraphQLModule } from "./grapghql/graphql.module";
import { RegisterComponent } from "./register/register.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { FooterComponent } from "./footer/footer.component";
import { PracticeComponent } from "./practice/practice.component";
import { RecordComponent } from "./practice/record/record.component";
import { ExpertComponent } from "./expert/expert.component";
import { ExpertDetailComponent } from "./expert/expert-detail/expert-detail.component";
import { NotificationComponent } from "./notification/notification.component";
import { ScoreComponent } from "./score/score.component";
import { ScoreDetailComponent } from "./score/score-detail/score-detail.component";

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Get404Component,
    RegisterComponent,
    FooterComponent,
    PracticeComponent,
    RecordComponent,
    ExpertComponent,
    ExpertDetailComponent,
    NotificationComponent,
    ScoreComponent,
    ScoreDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    GraphQLModule,
    FontAwesomeModule,
    NgxChartsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule {}
