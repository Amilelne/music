import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CourseService } from "app/admin/course/course.service";

@Component({
  selector: "app-tutorial",
  templateUrl: "./tutorial.component.html",
  styleUrls: ["./tutorial.component.scss"]
})
export class TutorialComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}
  tutorialUrl;
  tutorialType;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.courseService.getTutorialDetail(id).subscribe(data => {
      this.tutorialUrl = data.resourceUrl;
      this.tutorialType = data.resourceType;
      console.log(this.tutorialUrl, ":", this.tutorialType);
    });
  }
}
