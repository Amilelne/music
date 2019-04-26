import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"]
})
export class CourseComponent implements OnInit {
  isCourseVisible = false;
  isPracticeVisible = false;
  constructor() {}

  ngOnInit() {}

  createPractice() {
    this.isPracticeVisible = true;
  }

  createCourse() {
    this.isCourseVisible = true;
  }
}
