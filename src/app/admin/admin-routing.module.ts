import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserComponent } from "./user/user.component";
import { AuthGuard } from "../core/auth/auth.guard";
import { ReportComponent } from "./report/report.component";
import { UserDetailComponent } from "./user/user-detail/user-detail.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ["admin", "expert"] },
    children: [
      {
        path: "",
        children: [
          {
            path: "",
            component: DashboardComponent,
            pathMatch: "full",
            canActivate: [AuthGuard],
            data: { roles: ["admin"] }
          },
          {
            path: "course",
            loadChildren: "./course/course.module#CourseModule"
          },
          {
            path: "users",
            component: UserComponent,
            canActivate: [AuthGuard],
            data: { roles: ["admin"] }
          },
          {
            path: "user/:id",
            component: UserDetailComponent,
            canActivate: [AuthGuard],
            data: { roles: ["admin"] }
          },
          {
            path: "reports",
            component: ReportComponent,
            canActivate: [AuthGuard],
            data: { roles: ["admin"] }
          },
          {
            path: "messages",
            component: DashboardComponent,
            canActivate: [AuthGuard],
            data: { roles: ["admin"] }
          },
          {
            path: "notifications",
            component: DashboardComponent,
            canActivate: [AuthGuard],
            data: { roles: ["admin"] }
          }
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
