import { Injectable } from "@angular/core";
import {
  Notice,
  NoticeGQL,
  NoticesToUserGQL,
  NoticesToGroupGQL,
  SendNoticeGQL,
  CreateNoticeInput,
  UnreadNoticesToUserGQL,
  UnreadNoticesToGroupGQL,
  ReadNoticeGQL,
  DeleteNoticeGQL
} from "@app/gql";
import { throwError, of } from "rxjs";
import { mergeMap, map } from "rxjs/operators";
import { Observable } from "apollo-link";

@Injectable({
  providedIn: "root"
})
export class NoticeService {
  constructor(
    private noticeGQL: NoticeGQL,
    private noticesToUserGQL: NoticesToUserGQL,
    private noticesToGroupGQL: NoticesToGroupGQL,
    private sendNoticeGQL: SendNoticeGQL,
    private unreadNoticesToUserGQL: UnreadNoticesToUserGQL,
    private unreadNoticesToGroupGQL: UnreadNoticesToGroupGQL,
    private readNoticeGQL: ReadNoticeGQL,
    private deleteNoticeGQL: DeleteNoticeGQL
  ) {}

  getNoticeById(id) {
    return this.noticeGQL
      .watch({ id })
      .valueChanges.pipe(map(result => result.data.notice));
  }

  getUnreadNoticesToUser(userId) {
    return this.unreadNoticesToUserGQL
      .watch({ userId })
      .valueChanges.pipe(map(result => result.data.unreadNoticesToUser));
  }

  getUnreadNoticesToGroup(userRole) {
    return this.unreadNoticesToGroupGQL
      .watch({ userRole })
      .valueChanges.pipe(map(result => result.data.unreadNoticesToGroup));
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

  readNotice(id, userId, userRole) {
    return this.readNoticeGQL
      .mutate(
        { id },
        {
          refetchQueries: [
            {
              query: this.unreadNoticesToUserGQL.document,
              variables: {
                userId
              }
            },
            {
              query: this.unreadNoticesToGroupGQL.document,
              variables: {
                userRole
              }
            }
          ]
        }
      )
      .pipe(
        mergeMap(({ data, errors }) => {
          if (errors) {
            return throwError(errors);
          } else {
            return of(data);
          }
        })
      );
  }

  deleteNotice(id, userId, userRole) {
    return this.deleteNoticeGQL
      .mutate(
        { id },
        {
          refetchQueries: [
            {
              query: this.unreadNoticesToUserGQL.document,
              variables: {
                userId
              }
            },
            {
              query: this.unreadNoticesToGroupGQL.document,
              variables: {
                userRole
              }
            }
          ]
        }
      )
      .pipe(
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
