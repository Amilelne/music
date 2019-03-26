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
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  // online user options
  onLineData = [
    {
      value: 6182,
      name: "2016-09-20T23:36:01.723Z"
    },
    {
      value: 5213,
      name: "2016-09-15T19:11:17.167Z"
    },
    {
      value: 6761,
      name: "2016-09-21T08:01:49.734Z"
    },
    {
      value: 4056,
      name: "2016-09-13T10:32:22.957Z"
    },
    {
      value: 6189,
      name: "2016-09-15T00:09:26.995Z"
    }
  ];

  onSelect(event) {
    console.log(event);
  }
}
