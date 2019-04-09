import { Component, OnInit, Input } from '@angular/core';
import { ExpertService } from "../expert.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-expert-detail',
  templateUrl: './expert-detail.component.html',
  styleUrls: ['./expert-detail.component.scss']
})
export class ExpertDetailComponent implements OnInit {
  @Input() expert: any;
  constructor(private expertService: ExpertService,
    private route: ActivatedRoute) { }

  private expertId;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.expertId = params.id;
    });

    this.expertService.getExpertDetail(this.expertId).subscribe(data => {
      this.expert = data;
    })
  }

}
