import { Component, OnInit } from "@angular/core";
import { CourseService } from "../course.service";

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.scss"]
})
export class CourseListComponent implements OnInit {
  constructor(private courseService: CourseService) {}

  sortName = null;
  sortValue = null;
  listOfSearchName: any[];
  searchAddress: string;
  data = [];
  displayData: any[];

  ngOnInit() {
    this.courseService.getCourseList().subscribe(data => {
      this.data = data;
      this.displayData = [...this.data];
    });
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    /** sort data **/
    const data = [...this.data];
    if (this.sortName && this.sortValue) {
      this.displayData = data.sort((a, b) =>
        this.sortValue === "ascend"
          ? a[this.sortName] > b[this.sortName]
            ? 1
            : -1
          : b[this.sortName] > a[this.sortName]
          ? 1
          : -1
      );
    } else {
      this.displayData = data;
    }
  }
}
