import { Component, OnInit } from "@angular/core";
import { CourseService } from "../course.service";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-practice-list",
  templateUrl: "./practice-list.component.html",
  styleUrls: ["./practice-list.component.scss"]
})
export class PracticeListComponent implements OnInit {
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
    this.courseService
      .getPracticeList(null, null, null, null)
      .subscribe(data => {
        this.data = data;
        this.displayData = [...this.data];
      });
  }

  delete(id) {
    this.courseService.deletePracticeById(id).subscribe(data => {
      this.createMessage(
        "success",
        `已成功删除${data["deletePractice"].title}`
      );
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
