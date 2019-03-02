import { Injectable } from "@angular/core";
import { UploadRecordGQL, Record, Upload } from "@app/gql";
import { throwError, of } from "rxjs";
import { mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RecordService {
  constructor(private uploadRecordGQL: UploadRecordGQL) {}

  getRecordsByUserId(userId) {}

  uploadRecord(file: Upload, userId, practiceId) {
    return this.uploadRecordGQL
      .mutate(
        { file, userId, practiceId },
        { errorPolicy: "all", fetchPolicy: "no-cache" }
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
