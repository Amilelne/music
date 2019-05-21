import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/core/auth/auth.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  public userRole;
  constructor() {
    this.userRole = AuthService.getStoredUserRole();
  }
  isCollapsed = false;

  ngOnInit() {}
}
