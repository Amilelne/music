import { Injectable } from '@angular/core';
import { throwError, of } from 'rxjs';
import { mergeMap, tap, map } from 'rxjs/operators';
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
  AdminPracticeDetailGQL
} from '../../../gql';

@Injectable({
  providedIn: 'root'
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
    private createPracticeGQL: AdminCreatePracticeGQL
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
    return this.courseListGQL
      .fetch()
      .pipe(map((result) => result.data.courses));
  }

  getPracticeList() {
    return this.practiceListGQL
      .fetch()
      .pipe(map((result) => result.data.practices));
  }
  getCourseDetail(id) {
    return this.courseDetailGQL
      .watch({ id: id })
      .valueChanges.pipe(map((result) => result.data.course));
  }
  getPracticeDetail(id) {
    return this.practiceDetailGQL
      .watch({ id: id })
      .valueChanges.pipe(map((result) => result.data.practice));
  }

  createTutorial(createTutorialInput: CreateTutorialInput, id) {
    return this.createTutorialGQL
      .mutate(
        { data: createTutorialInput, id: id },
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
          // console.log(id);
        })
      );
  }

  createPractice(createPracticeInput: CreatePracticeInput) {
    return this.createPracticeGQL
      .mutate(
        { data: createPracticeInput },
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
        tap(({ addPractice: { id } }) => {
          // console.log(id);
        })
      );
  }

  singleUploadFile(file: Upload) {
    return this.uploadFileGQL
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
