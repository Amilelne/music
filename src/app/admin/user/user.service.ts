import { Injectable } from "@angular/core";
import { throwError, of } from "rxjs";
import { mergeMap, tap, map } from "rxjs/operators";
import {
  AdminUsersGQL,
  User,
  AdminUserByIdGQL,
  AdminUpdateUserRoleGQL,
  AdminDeleteUserByIdGQL
} from "@app/gql";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private userListGQL: AdminUsersGQL,
    private userByIdGQL: AdminUserByIdGQL,
    private updateUserRoleGQL: AdminUpdateUserRoleGQL,
    private deleteUserByIdGQL: AdminDeleteUserByIdGQL
  ) {}

  getUserList() {
    return this.userListGQL
      .watch({})
      .valueChanges.pipe(map(result => result.data.users));
  }
  getUserById(id) {
    return this.userByIdGQL
      .watch({ id })
      .valueChanges.pipe(map(result => result.data.user));
  }
  updateUserRole(userId, userRole) {
    return this.updateUserRoleGQL.mutate({ userId, userRole }).pipe(
      mergeMap(({ data, errors }) => {
        if (errors) {
          return throwError(errors);
        } else {
          return of(data);
        }
      })
    );
  }
  deleteUserById(id) {
    return this.deleteUserByIdGQL
      .mutate(
        { id },
        {
          refetchQueries: [
            {
              query: this.userListGQL.document
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
