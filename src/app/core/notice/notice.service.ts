import { Injectable } from "@angular/core";
import {
  Notice,
  NoticeGQL,
  NoticesToUserGQL,
  NoticesToGroupGQL,
  SendNoticeGQL,
  CreateNoticeInput
} from "@app/gql";
import { throwError, of } from "rxjs";
import { mergeMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class NoticeService {
  constructor(
    private noticeGQL: NoticeGQL,
    private noticesToUserGQL: NoticesToUserGQL,
    private noticesToGroupGQL: NoticesToGroupGQL,
    private sendNoticeGQL: SendNoticeGQL
  ) {}

  getNoticeById(id) {
    return this.noticeGQL
      .watch({ id })
      .valueChanges.pipe(map(result => result.data.notice));
  }

  getNoticesToUser(userId) {
    return this.noticesToUserGQL
      .watch({ userId })
      .valueChanges.pipe(map(result => result.data.noticesToUser));
  }

  getNoticesToGroup(userRole) {
    return this.noticesToGroupGQL
      .watch({ userRole })
      .valueChanges.pipe(map(result => result.data.noticesToGroup));
  }

  sendNotice(createNoticeInput: CreateNoticeInput) {
    return this.sendNoticeGQL.mutate({ data: createNoticeInput }).pipe(
      mergeMap(({ data, errors }) => {
        if (errors) {
          return throwError(errors);
        } else {
          return of(data);
        }
      })
    );
  }
}
