import { Injectable } from "@angular/core";
import { throwError, of, BehaviorSubject } from "rxjs";
import { mergeMap, tap, map } from "rxjs/operators";
import {
  AdminCreateCourseGQL,
  AdminCreateTutorialGQL,
  CreateCourseInput,
  CreateTutorialInput,
  CreatePracticeInput,
  AdminUploadFileGQL,
  Upload,
  AdminCoursesGQL,
  AdminPracticesGQL,
  AdminCourseDetailGQL,
  AdminCreatePracticeGQL,
  AdminPracticeDetailGQL,
  TutorialDetailGQL,
  Course,
  AdminCourseNumberByKind,
  AdminCourseNumberByKindGQL,
  CoursesCountGQL,
  PracticesCountGQL
} from "../../../gql";

@Injectable({
  providedIn: "root"
})
export class CourseService {
  constructor(
    private createCourseGQL: AdminCreateCourseGQL,
    private courseListGQL: AdminCoursesGQL,
    private practiceListGQL: AdminPracticesGQL,
    private createTutorialGQL: AdminCreateTutorialGQL,
    private uploadFileGQL: AdminUploadFileGQL,
    private courseDetailGQL: AdminCourseDetailGQL,
    private practiceDetailGQL: AdminPracticeDetailGQL,
    private createPracticeGQL: AdminCreatePracticeGQL,
    private tutorialDetailGQL: TutorialDetailGQL,
    private courseNumberByKindGQL: AdminCourseNumberByKindGQL,
    private coursesCountGQL: CoursesCountGQL,
    private practiceCountGQL: PracticesCountGQL
  ) {}

  createCourse(createCourseInput: CreateCourseInput) {
    return this.createCourseGQL
      .mutate(
        {
          data: createCourseInput
        },
        {
          refetchQueries: [
            {
              query: this.courseListGQL.document
            }
          ],
          errorPolicy: "all"
        }
      )
      .pipe(
        mergeMap(({ data, errors }) => {
          if (errors) {
            console.log(errors);
            return throwError(errors);
          } else {
            return of(data);
          }
        }),
        tap(() => {
          //
        })
      );
  }

  getCourseList(pageIndex, pageSize, kind) {
    return this.courseListGQL
      .watch({ pageIndex, pageSize, kind })
      .valueChanges.pipe(map(result => result.data.courses));
  }
  getCoursesCount(kind) {
    return this.coursesCountGQL
      .watch({ kind })
      .valueChanges.pipe(map(result => result.data.coursesCount));
  }

  getPracticeList(pageIndex, pageSize, kind, level) {
    return this.practiceListGQL
      .watch({ pageIndex, pageSize, kind, level })
      .valueChanges.pipe(map(result => result.data.practices));
  }
  getPracticeCount(kind, level) {
    return this.practiceCountGQL
      .watch({ kind, level })
      .valueChanges.pipe(map(result => result.data.practicesCount));
  }
  getCourseDetail(id) {
    return this.courseDetailGQL
      .watch({ id: id })
      .valueChanges.pipe(map(result => result.data.course));
  }
  getPracticeDetail(id) {
    return this.practiceDetailGQL
      .watch({ id: id })
      .valueChanges.pipe(map(result => result.data.practice));
  }
  getTutorialDetail(id) {
    return this.tutorialDetailGQL
      .watch({ id: id })
      .valueChanges.pipe(map(result => result.data.tutorial));
  }
  getCourseNumberByKind() {
    return this.courseNumberByKindGQL
      .watch()
      .valueChanges.pipe(map(result => result.data.courseNumberByKind));
  }

  createTutorial(createTutorialInput: CreateTutorialInput, id) {
    return this.createTutorialGQL
      .mutate(
        { data: createTutorialInput, id: id },
        {
          refetchQueries: [
            {
              query: this.courseDetailGQL.document,
              variables: { id: id }
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
        }),
        tap(({ addTutorial: { id } }) => {
          // console.log(id);
        })
      );
  }

  createPractice(createPracticeInput: CreatePracticeInput) {
    return this.createPracticeGQL
      .mutate(
        { data: createPracticeInput },
        {
          refetchQueries: [
            {
              query: this.practiceListGQL.document
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
        }),
        tap(({ addPractice: { id } }) => {
          // console.log(id);
        })
      );
  }

  singleUploadFile(file: Upload) {
    return this.uploadFileGQL
      .mutate({ file: file }, { errorPolicy: "all", fetchPolicy: "no-cache" })
      .pipe(
        mergeMap(({ data, errors }) => {
          if (errors) {
            return throwError(errors);
          } else {
            return of(data);
          }
        }),
        tap(({ singleUpload: { filename } }) => {
          // console.log(filename);
        })
      );
  }
}
