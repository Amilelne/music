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
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.courseService
        .getPracticeList(queryParams.kind, queryParams.level)
        .subscribe(data => {
          this.practices = data;
          this.totalPractice = this.practices.length;
        });
    });
  }
}
