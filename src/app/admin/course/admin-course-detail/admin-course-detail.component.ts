import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CourseService } from "../course.service";

@Component({
  selector: "app-admin-course-detail",
  templateUrl: "./admin-course-detail.component.html",
  styleUrls: ["./admin-course-detail.component.scss"]
})
export class AdminCourseDetailComponent implements OnInit {
  constructor(private router: Router, private courseService: CourseService) {}

  courseDetail: any;
  ID;
  ngOnInit() {
    this.ID = this.router.url.split("/").slice(-1)[0];
    this.courseService.getCourseDetail(this.ID).subscribe(data => {
      this.courseDetail = data;
    });
  }

  onFileChanged(event) {
    const file = event.target.files[0];

    this.courseService.updateCoursePicture(this.ID, file).subscribe(
      ({ updateCoursePicture }) => {
        //success
        this.courseDetail.pictureUrl = updateCoursePicture.pictureUrl;
      },
      errors => {
        if (errors !== undefined) {
          console.log(errors);
        }
      }
    );
  }
}
