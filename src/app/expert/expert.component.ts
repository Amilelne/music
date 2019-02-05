import { Component, OnInit, Input } from '@angular/core';
import { ExpertService } from './expert.service';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss']
})
export class ExpertComponent implements OnInit {
  @Input() expertsList;
  constructor(private expertService: ExpertService) {}

  ngOnInit() {
    this.expertService.getExperts().subscribe(data => {
      this.expertsList = data;
    });
  }
}
