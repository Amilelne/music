import { Injectable } from "@angular/core";
import { UpdateAvatarGQL, Upload } from "@app/gql";
import { mergeMap, tap } from "rxjs/operators";
import { throwError, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProfileUpdateService {
  constructor(private updateAvatarGQL: UpdateAvatarGQL) {}

  updateAvatar(userId, file: Upload) {
    return this.updateAvatarGQL.mutate({ userId: userId, file: file }).pipe(
      mergeMap(({ data, errors }) => {
        if (errors) {
          return throwError(errors);
        } else {
          return of(data);
        }
      }),
      tap(({ updateAvatar: { filename } }) => {
        //
      })
    );
  }
}
