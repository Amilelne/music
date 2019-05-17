import { Component, OnInit } from "@angular/core";
import { CourseService } from "../course/course.service";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"]
})
export class ReportComponent implements OnInit {
  courseKindNumbers: any[];
  courseData: any[];
  practiceKindNumbers: any[];
  practiceData: any[];
  constructor(private courseService: CourseService) {}
  ngOnInit() {
    this.courseService.getCourseNumberByKind().subscribe(data => {
      this.courseKindNumbers = data;
      this.courseData = [
        {
          name: "乐理",
          value: data[0]
        },
        {
          name: "视唱",
          value: data[1]
        },
        {
          name: "练耳",
          value: data[2]
        }
      ];
    });
    this.courseService.getPracticeNumberByKind().subscribe(data => {
      this.practiceKindNumbers = data;
      this.practiceData = [
        {
          name: "乐理",
          value: data[0]
        },
        {
          name: "视唱",
          value: data[1]
        },
        {
          name: "练耳",
          value: data[2]
        }
      ];
    });
  }

  view: any[] = [700, 400];

  // course options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "课程类别";
  showYAxisLabel = true;
  yAxisLabel = "课程数量";
  colorScheme = {
    domain: ["#9c405d", "#81a3e0", "#9c80a5"]
  };

  // practice options
  pxAxisLabel = "练习类别";
  pyAxisLabel = "练习数量";
  pcolorScheme = {
    domain: ["#b5e2f3", "#b3cdea", "#9f5d64"]
  };

  onSelect(event) {
    console.log(event);
  }
}
