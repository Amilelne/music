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
  imgUrls = [
    "http://www.ixzds.com/wp-content/uploads/elementor/thumbs/newbanner1-nv7w1t9nncjfdquxgyjpbp7qibvjzqxzktynnwh35w.png",
    "http://www.ixzds.com/wp-content/uploads/elementor/thumbs/newbanner2-nv7w1u7hu6kppctkbgybw6z73pqx7g1pwym556fozo.png",
    "http://www.ixzds.com/wp-content/uploads/elementor/thumbs/newbanner3-1-nv80hnplv3ctqioa31xqcd3n780myriq7zt7nvgx1g.png"
  ];

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.courseService.getCourseList(queryParams.kind).subscribe(data => {
        this.courses = data;
        this.totalCourse = this.courses.length;
      });
    });
  }
}
