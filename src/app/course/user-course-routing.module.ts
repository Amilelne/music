import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CourseDetailChapterComponent } from "./course-detail/course-detail-chapter/course-detail-chapter.component";
import { CourseComponent } from "./course.component";
import { CourseDetailComponent } from "./course-detail/course-detail.component";
import { TutorialComponent } from "./tutorial/tutorial.component";
import { AuthGuard } from "app/core/auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: CourseComponent,
    pathMatch: "full"
  },
  {
    path: ":id",
    component: CourseDetailComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: CourseDetailChapterComponent,
        children: [
          {
            path: "chapter",
            component: CourseDetailChapterComponent
          }
        ]
      }
    ]
  },
  {
    path: "tutorial/:id",
    component: TutorialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCourseRoutingModule {}
