import { Injectable } from '@angular/core';
import { ExpertsGQL } from '../../gql';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ExpertService {
  constructor(private expertsGQL: ExpertsGQL) {}

  getExperts() {
    return this.expertsGQL.fetch().pipe(map(result => result.data.experts));
  }
  getExpertDetail() {
    //
  }
}
