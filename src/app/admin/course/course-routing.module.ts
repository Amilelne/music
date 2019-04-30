import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CourseComponent } from "./course.component";
import { AddCourseComponent } from "./add-course/add-course.component";
import { CourseListComponent } from "./course-list/course-list.component";
import { AdminCourseDetailComponent } from "./admin-course-detail/admin-course-detail.component";
import { AdminCourseDetailContentComponent } from "./admin-course-detail/admin-course-detail-content/admin-course-detail-content.component";
import { PracticeListComponent } from "./practice-list/practice-list.component";

const routes: Routes = [
  { path: "", component: CourseComponent, pathMatch: "full" },
  { path: "add", component: AddCourseComponent },
  { path: "list", component: CourseListComponent },
  { path: "practices", component: PracticeListComponent },
  {
    path: ":id",
    component: AdminCourseDetailComponent,
    children: [
      {
        path: "",
        component: AdminCourseDetailContentComponent,
        children: [
          {
            path: "content",
            component: AdminCourseDetailContentComponent
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
export class CourseRoutingModule {}
