import { Injectable } from "@angular/core";
import {
  UpdateAvatarGQL,
  Upload,
  UpdateProfileInput,
  UpdateProfileGQL
} from "@app/gql";
import { mergeMap, tap } from "rxjs/operators";
import { throwError, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProfileUpdateService {
  constructor(
    private updateAvatarGQL: UpdateAvatarGQL,
    private updateProfileGQl: UpdateProfileGQL
  ) {}

  updateAvatar(userId, file: Upload) {
    return this.updateAvatarGQL.mutate({ userId: userId, file: file }).pipe(
      mergeMap(({ data, errors }) => {
        if (errors) {
          return throwError(errors);
        } else {
          return of(data);
        }
      }),
      tap(({ updateAvatar }) => {
        //
      })
    );
  }

  updateProfile(userId, updateProfileInput: UpdateProfileInput) {
    return this.updateProfileGQl
      .mutate({
        data: updateProfileInput,
        userId: userId
      })
      .pipe(
        mergeMap(({ data, errors }) => {
          if (errors) {
            return throwError(errors);
          } else {
            return of(data);
          }
        }),
        tap(({ updateProfile }) => {
          //
        })
      );
  }
}
