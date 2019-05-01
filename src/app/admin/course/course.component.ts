import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"]
})
export class CourseComponent implements OnInit {
  isCourseVisible = false;
  isPracticeVisible = false;
  userRole;
  constructor() {}

  ngOnInit() {
    this.userRole = AuthService.getStoredUserRole();
  }

  createPractice() {
    this.isPracticeVisible = true;
  }

  createCourse() {
    this.isCourseVisible = true;
  }
}
