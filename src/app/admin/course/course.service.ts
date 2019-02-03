import { Injectable } from '@angular/core';
import { throwError, of } from 'rxjs';
import { mergeMap, tap, map } from 'rxjs/operators';
import {
  AdminCreateCourseGQL,
  AdminCreateTutorialGQL,
  CreateCourseInput,
  CreateTutorialInput,
  AdminUploadFileGQL,
  Upload,
  AdminCoursesGQL,
  AdminCourseDetailGQL
} from '../../../gql';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(
    private createCourseGQL: AdminCreateCourseGQL,
    private courseList: AdminCoursesGQL,
    private createTutorialGQL: AdminCreateTutorialGQL,
    private uploadFile: AdminUploadFileGQL,
    private courseDetail: AdminCourseDetailGQL
  ) {}

  createCourse(createCourseInput: CreateCourseInput) {
    return this.createCourseGQL
      .mutate(
        {
          data: createCourseInput
        },
        { errorPolicy: 'all', fetchPolicy: 'no-cache' }
      )
      .pipe(
        mergeMap(({ data, errors }) => {
          if (errors) {
            return throwError(errors);
          } else {
            return of(data);
          }
        }),
        tap(({ addCourse: { id } }) => {
          // console.log(id);
        })
      );
  }

  getCourseList() {
    return this.courseList.fetch().pipe(map(result => result.data.courses));
  }

  getCourseDetail(id) {
    return this.courseDetail
      .watch({ id: id })
      .valueChanges.pipe(map(result => result.data.course));
  }

  createTutorial(createTutorialInput: CreateTutorialInput) {
    return this.createTutorialGQL
      .mutate(
        { data: createTutorialInput },
        { errorPolicy: 'all', fetchPolicy: 'no-cache' }
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
          console.log(id);
        })
      );
  }

  singleUploadFile(file: Upload) {
    return this.uploadFile
      .mutate({ file: file }, { errorPolicy: 'all', fetchPolicy: 'no-cache' })
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
