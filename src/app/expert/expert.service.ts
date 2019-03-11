import { Injectable } from "@angular/core";
import { ExpertsGQL, ExpertGQL } from "../../gql";
import { map, tap } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class ExpertService {
  constructor(private expertsGQL: ExpertsGQL, private expertGQL: ExpertGQL) {}

  getExperts() {
    return this.expertsGQL.fetch().pipe(map(result => result.data.experts));
  }
  getExpertDetail(id) {
    return this.expertGQL
      .watch({ id: id })
      .valueChanges.pipe(map(result => result.data.expert));
  }
}
