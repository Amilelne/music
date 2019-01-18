import { Injectable } from '@angular/core';
import { throwError, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { AdminCreateCourseGQL, CreateCourseInput } from '@app/gql';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private createCourseGQL: AdminCreateCourseGQL) {}

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
}
