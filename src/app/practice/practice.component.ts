import { Component, OnInit, Input } from "@angular/core";
import { CourseService } from "app/admin/course/course.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-practice",
  templateUrl: "./practice.component.html",
  styleUrls: ["./practice.component.scss"]
})
export class PracticeComponent implements OnInit {
  @Input() practices;
  totalPractice;
  pageIndex = 1;
  pageSize = 10;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams.page) {
        this.pageIndex = queryParams.page;
      }
      this.courseService
        .getPracticeCount(queryParams.kind, queryParams.level)
        .subscribe(data => {
          this.totalPractice = data;
        });
      this.courseService
        .getPracticeList(
          this.pageIndex,
          this.pageSize,
          queryParams.kind,
          queryParams.level
        )
        .subscribe(data => {
          this.practices = data;
        });
    });
  }
  pageIndexChange(pageIndex) {
    this.pageIndex = pageIndex;
  }
}
