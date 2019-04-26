import { Component, OnInit, Input } from "@angular/core";
import { CourseService } from "app/admin/course/course.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"]
})
export class CourseComponent implements OnInit {
  @Input() courses;
  totalCourse;
  imgUrls = ["assets/images/main_page_1.jpg", "assets/images/main_page_2.jpg"];
  pageIndex = 1;
  pageSize = 8;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams.page) {
        this.pageIndex = queryParams.page;
      }
      this.courseService.getCoursesCount(queryParams.kind).subscribe(data => {
        this.totalCourse = data;
      });
      this.courseService
        .getCourseList(this.pageIndex, this.pageSize, queryParams.kind)
        .subscribe(data => {
          this.courses = data;
        });
    });
  }
  pageIndexChange(pageIndex) {
    this.pageIndex = pageIndex;
  }
}
