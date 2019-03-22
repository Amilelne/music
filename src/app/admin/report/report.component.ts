import { Component, OnInit } from "@angular/core";
import { CourseService } from "../course/course.service";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"]
})
export class ReportComponent implements OnInit {
  private courseKindNumbers: any[];
  private courseData: any[];
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
  }

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "课程类别";
  showYAxisLabel = true;
  yAxisLabel = "课程数量";
  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  onSelect(event) {
    console.log(event);
  }
}
