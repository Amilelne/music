import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService) {}
  nameList = [];
  addressList = [];
  userList = [];
  sortName = null;
  sortValue = null;
  searchValue = "";
  listOfSearchName: any[];
  searchAddress: string;
  data = [];
  displayData: any[];

  ngOnInit() {
    this.userService.getUserList().subscribe(data => {
      this.userList = data;
      this.displayData = [...this.userList];
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
    const filterFunc = item => {
      return item.name.indexOf(this.searchValue) !== -1;
    };
    let data = [...this.displayData];
    data = data.filter(item => filterFunc(item));
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
