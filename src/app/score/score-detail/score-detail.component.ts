import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RecordService } from "app/core/record/record.service";
import { CourseService } from "app/admin/course/course.service";
import { DomSanitizer } from "@angular/platform-browser";
import { NzMessageService } from "ng-zorro-antd";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { AuthService } from "app/core/auth/auth.service";

@Component({
  selector: "app-score-detail",
  templateUrl: "./score-detail.component.html",
  styleUrls: ["./score-detail.component.scss"]
})
export class ScoreDetailComponent implements OnInit {
  private audioId;
  private record;
  private practiceResourceUrl;
  private expertId;
  private scored = false;
  constructor(
    private route: ActivatedRoute,
    private recordService: RecordService,
    private courseService: CourseService,
    private domSanitizer: DomSanitizer,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}
  validateForm: FormGroup;

  ngOnInit() {
    // get record detail
    this.route.params.subscribe(params => {
      this.audioId = params.id;
      this.recordService.getRecordById(this.audioId).subscribe(data => {
        this.record = data;
        this.courseService
          .getPracticeDetail(this.record.practiceId)
          .subscribe(practice => {
            this.practiceResourceUrl = practice.resourceUrl;
          });
      });
    });
    // initiate form data
    this.validateForm = this.fb.group({
      expertBeatScore: [null, [Validators.required]],
      expertIntonationScore: [null, [Validators.required]]
    });
    // get expert id
    this.expertId = AuthService.getStoredUserId();
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
  createMessage(type: string, content: string): void {
    this.message.create(type, content);
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.recordService
      .scoreRecord(
        this.audioId,
        this.expertId,
        this.validateForm.value["expertBeatScore"],
        this.validateForm.value["expertIntonationScore"]
      )
      .subscribe(data => {
        this.scored = true;
        this.createMessage("success", "评分成功");
        console.log(data);
      });
  }
}
