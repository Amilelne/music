import { Component, OnInit } from "@angular/core";
import { RecordService } from "app/core/record/record.service";

@Component({
  selector: "app-score",
  templateUrl: "./score.component.html",
  styleUrls: ["./score.component.scss"]
})
export class ScoreComponent implements OnInit {
  constructor(private recordService: RecordService) {}

  audioList;
  ngOnInit() {
    this.recordService.getUnscoredRecords().subscribe(audios => {
      this.audioList = audios;
    });
  }
}
