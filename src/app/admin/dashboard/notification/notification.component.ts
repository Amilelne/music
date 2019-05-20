import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"]
})
export class NotificationComponent implements OnInit {
  constructor() {}

  loading = false;
  data = [
    {
      title: "学生李时完成了视唱练习一"
    },
    { title: "专家莫扎特创建了新课程乐理基础一" },
    { title: "学生林斌完成了视唱练习二" },
    { title: "学生林慧子完成了视唱进阶二" }
  ];

  ngOnInit() {}
}
