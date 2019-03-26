import { Injectable } from "@angular/core";
import {
  UploadRecordGQL,
  Record,
  Upload,
  UserRecordsGQL,
  RecordsGQL,
  RecordGQL,
  ScoreRecordGQL,
  UnscoredRecordsGQL
} from "@app/gql";
import { throwError, of } from "rxjs";
import { mergeMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RecordService {
  constructor(
    private uploadRecordGQL: UploadRecordGQL,
    private userRecordsGQL: UserRecordsGQL,
    private recordsGQL: RecordsGQL,
    private recordGQL: RecordGQL,
    private scoreRecordGQL: ScoreRecordGQL,
    private unscoredRecordsGQL: UnscoredRecordsGQL
  ) {}

  getRecordsByUserId(userId) {
    return this.userRecordsGQL
      .watch({ userId })
      .valueChanges.pipe(map(result => result.data.userRecords));
  }

  getRecords() {
    return this.recordsGQL
      .watch()
      .valueChanges.pipe(map(result => result.data.records));
  }

  getUnscoredRecords() {
    return this.unscoredRecordsGQL
      .watch()
      .valueChanges.pipe(map(result => result.data.unscoredRecords));
  }

  getRecordById(id) {
    return this.recordGQL
      .watch({ id })
      .valueChanges.pipe(map(result => result.data.record));
  }

  uploadRecord(file, userId, practiceId, practiceTitle) {
    let data = { file, userId, practiceId, practiceTitle };
    return this.uploadRecordGQL
      .mutate(
        { data },
        {
          refetchQueries: [
            {
              query: this.unscoredRecordsGQL.document
            }
          ],
          errorPolicy: "all",
          fetchPolicy: "no-cache"
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

  scoreRecord(id, expertId, expertBeatScore, expertIntonationScore) {
    let data = { id, expertId, expertBeatScore, expertIntonationScore };
    return this.scoreRecordGQL
      .mutate(
        { data },
        {
          refetchQueries: [
            {
              query: this.unscoredRecordsGQL.document
            }
          ],
          fetchPolicy: "no-cache"
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
