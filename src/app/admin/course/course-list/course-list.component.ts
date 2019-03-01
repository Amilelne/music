import { Component, OnInit } from "@angular/core";
import { CourseService } from "../course.service";

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.scss"]
})
export class CourseListComponent implements OnInit {
  constructor(private courseService: CourseService) {}

  nameList = [{ text: "Joe", value: "Joe" }, { text: "Jim", value: "Jim" }];
  addressList = [
    { text: "London", value: "London" },
    { text: "Sidney", value: "Sidney" }
  ];
  courseList = [];
  sortName = null;
  sortValue = null;
  listOfSearchName: any[];
  searchAddress: string;
  data = [
    {
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park"
    },
    {
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park"
    },
    {
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park"
    },
    {
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park"
    }
  ];
  displayData: any[];

  async ngOnInit() {
    await this.courseService.courseList$.subscribe(data => {
      this.courseList = data;
      this.displayData = [...this.courseList];
    });
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filter(listOfSearchName: string[], searchAddress: string): void {
    this.listOfSearchName = listOfSearchName;
    this.searchAddress = searchAddress;
    this.search();
  }

  search(): void {
    /** filter data **/
    const filterFunc = item =>
      (this.searchAddress
        ? item.address.indexOf(this.searchAddress) !== -1
        : true) &&
      (this.listOfSearchName.length
        ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1)
        : true);
    const data = this.data.filter(item => filterFunc(item));
    /** sort data **/
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
