import { Injectable } from "@angular/core";
import { throwError, of } from "rxjs";
import { mergeMap, tap, map } from "rxjs/operators";
import { AdminUsersGQL, User } from "@app/gql";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private userListGQL: AdminUsersGQL) {}

  getUserList() {
    return this.userListGQL.fetch().pipe(map(result => result.data.users));
  }
}
