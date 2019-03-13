import { Component, OnInit, Input } from "@angular/core";
import { ExpertService } from "./expert.service";

@Component({
  selector: "app-expert",
  templateUrl: "./expert.component.html",
  styleUrls: ["./expert.component.scss"]
})
export class ExpertComponent implements OnInit {
  @Input() expertsList;
  private totalExpert = 0;
  constructor(private expertService: ExpertService) {}

  ngOnInit() {
    this.expertService.getExperts().subscribe(data => {
      this.expertsList = data;
      this.totalExpert = this.expertsList.length;
    });
  }
}
