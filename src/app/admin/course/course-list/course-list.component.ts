import { Component, OnInit } from "@angular/core";
import { CourseService } from "../course.service";
import { NzMessageService } from "ng-zorro-antd";
import { AuthService } from "app/core/auth/auth.service";

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.scss"]
})
export class CourseListComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private message: NzMessageService
  ) {}

  sortName = null;
  sortValue = null;
  searchValue = "";
  listOfSearchName: any[];
  searchAddress: string;
  data = [];
  displayData: any[];

  ngOnInit() {
    let userRole = AuthService.getStoredUserRole();
    if (userRole === "expert") {
      let createId = AuthService.getStoredUserId();
      this.courseService
        .getCourseList(null, null, null, createId)
        .subscribe(data => {
          this.data = data;
          this.displayData = [...this.data];
        });
    } else {
      this.courseService
        .getCourseList(null, null, null, null)
        .subscribe(data => {
          this.data = data;
          this.displayData = [...this.data];
        });
    }
  }

  delete(id) {
    this.courseService.deleteCourseById(id).subscribe(data => {
      this.createMessage("success", `已成功删除${data["deleteCourse"].title}`);
    });
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    const filterFunc = item => {
      return item.title.indexOf(this.searchValue) !== -1;
    };
    /** sort data **/
    let data = [...this.data];
    data = data.filter(item => filterFunc(item));
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

  createMessage(type: string, info: string): void {
    this.message.create(type, info);
  }
}
