import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { Get404Component } from "./core/get404/get404.component";
import { RegisterComponent } from "./register/register.component";
import { PracticeComponent } from "./practice/practice.component";
import { RecordComponent } from "./practice/record/record.component";
import { ExpertComponent } from "./expert/expert.component";
import { NotificationComponent } from "./notification/notification.component";
import { ExpertDetailComponent } from "./expert/expert-detail/expert-detail.component";
import { ScoreComponent } from "./score/score.component";
import { ScoreDetailComponent } from "./score/score-detail/score-detail.component";
import { AuthGuard } from "./core/auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: "./course/user-course.module#UserCourseModule",
    pathMatch: "full"
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "courses",
    loadChildren: "./course/user-course.module#UserCourseModule"
  },
  {
    path: "user",
    loadChildren: "./user/user.module#UserModule"
  },
  { path: "practices", component: PracticeComponent },
  {
    path: "practices/:id",
    component: RecordComponent,
    canActivate: [AuthGuard]
  },
  { path: "experts", component: ExpertComponent },
  { path: "experts/:id", component: ExpertDetailComponent },
  {
    path: "score",
    component: ScoreComponent,
    canActivate: [AuthGuard],
    data: { roles: ["expert", "admin"] }
  },
  { path: "score/:id", component: ScoreDetailComponent },
  {
    path: "expert/manage/courses",
    loadChildren: "./admin/course/course.module#CourseModule",
    canActivate: [AuthGuard],
    data: { roles: ["expert", "admin"] }
  },
  { path: "admin", loadChildren: "./admin/admin.module#AdminModule" },
  { path: "notices", component: NotificationComponent },
  { path: "**", component: Get404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
