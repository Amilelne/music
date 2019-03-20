import { Component, OnInit } from "@angular/core";
import { NoticeService } from "app/core/notice/notice.service";
import { AuthService } from "app/core/auth/auth.service";
import { NoticesSendGQL, Notice } from "@app/gql";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"]
})
export class NotificationComponent implements OnInit {
  private userId;
  private userRole;
  private loading = false;
  private notices = [];
  constructor(
    private noticeService: NoticeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = AuthService.getStoredUserId();
    this.userRole = AuthService.getStoredUserRole();
    this.noticeService.getNoticesToUser(this.userId).subscribe(data => {
      this.notices = this.notices.concat(data);
    });
    this.noticeService.getNoticesToGroup(this.userRole).subscribe(data => {
      this.notices = this.notices.concat(data);
    });
  }
}
