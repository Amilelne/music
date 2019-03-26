import { Component, OnInit } from "@angular/core";
import { NoticeService } from "app/core/notice/notice.service";
import { AuthService } from "app/core/auth/auth.service";
import { NoticesSendGQL, Notice } from "@app/gql";
import { Observable } from "apollo-link";
import { subscribeOn } from "rxjs/operators";

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
    this.getNotices();
  }

  getNotices() {
    this.noticeService.getUnreadNoticesToUser(this.userId).subscribe(data => {
      this.notices = this.notices.concat(data);
    });
    this.noticeService
      .getUnreadNoticesToGroup(this.userRole)
      .subscribe(data => {
        this.notices = this.notices.concat(data);
      });
  }

  readNotice(id, event) {
    this.noticeService
      .readNotice(id, this.userId, this.userRole)
      .subscribe(data => {
        this.getNotices();
      });
  }
  deleteNotice(id) {
    this.noticeService
      .deleteNotice(id, this.userId, this.userRole)
      .subscribe(data => {
        this.getNotices();
      });
  }
}
