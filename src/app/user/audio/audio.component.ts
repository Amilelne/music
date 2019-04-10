import { Component, OnInit } from "@angular/core";
import { RecordService } from "app/core/record/record.service";
import { AuthService } from "app/core/auth/auth.service";

@Component({
  selector: "app-audio",
  templateUrl: "./audio.component.html",
  styleUrls: ["./audio.component.scss"]
})
export class AudioComponent implements OnInit {
  constructor(private recordService: RecordService) {
    this.userId = AuthService.getStoredUserId();
  }

  audioList;
  private userId;
  ngOnInit() {
    this.recordService.getRecordsByUserId(this.userId).subscribe(audios => {
      this.audioList = audios;
    });
  }
}
