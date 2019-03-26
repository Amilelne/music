import { Component, OnInit, Input } from "@angular/core";
import * as RecordRTC from "recordrtc";
import { DomSanitizer } from "@angular/platform-browser";
import { CourseService } from "app/admin/course/course.service";
import { ActivatedRoute } from "@angular/router";
import { Practice } from "@app/gql";
import { RecordService } from "../../core/record/record.service";
import { AuthService } from "app/core/auth/auth.service";
import { NoticeService } from "app/core/notice/notice.service";
import { NzNotificationService } from "ng-zorro-antd";

@Component({
  selector: "app-record",
  templateUrl: "./record.component.html",
  styleUrls: ["./record.component.scss", "../practice.component.scss"]
})
export class RecordComponent implements OnInit {
  @Input() practiceDetail: Practice;
  constructor(
    private domSanitizer: DomSanitizer,
    private courseService: CourseService,
    private recordService: RecordService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private noticeService: NoticeService,
    private notification: NzNotificationService
  ) {}
  // Lets initiate Record OBJ
  private record;
  // Detect recording
  private isRecord = false;
  // Detect stopping
  private isStop = false;
  // Detect uploading
  private isUpload = false;
  // Option for denoise
  private denoise = false;
  // Detect applied
  private isApplied = false;
  // Detect errors
  private isError = false;
  // Url of Blob
  private url;
  private blobFile;
  private error;
  private practiceId;
  private practiceTitle: String;
  private userId;
  private recommendPractices;
  // upload record id
  private recordId;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.practiceId = params.id;
      this.courseService.getPracticeDetail(this.practiceId).subscribe(data => {
        this.practiceDetail = data;
      });
    });
    this.userId = this.authService.getUserId();
    this.route.queryParams.subscribe(params => {
      this.practiceTitle = params.title;
    });
    this.courseService.getPracticeList().subscribe(data => {
      this.recommendPractices = data;
    });
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  // Start recording.
  initiateRecording() {
    this.isRecord = true;
    const mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  successCallback(stream) {
    const options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1
    };
    // Start Actuall Recording
    const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  stopRecording() {
    this.isRecord = false;
    this.isStop = true;
    this.record.stop(this.processRecording.bind(this));
  }

  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
    console.log(this.url);
  }

  uploadRecording() {
    this.recordService
      .uploadRecord(
        this.record.blob,
        this.userId,
        this.practiceId,
        this.practiceTitle
      )
      .subscribe(
        ({ uploadRecord: { id, audioUrl } }) => {
          this.isUpload = true;
          this.createNotification("录音上传成功");
          this.recordId = id;
        },
        errors => {
          this.isUpload = false;
          this.isError = true;
          if (errors !== undefined) {
            console.log(errors);
          }
        }
      );
  }
  errorCallback(error) {
    this.error = "Can not play audio in your browser";
  }
  applyExpertScore() {
    let content = "用户请求对练习" + this.practiceTitle + "进行评分";
    let data = {
      sendId: this.userId,
      userRole: "expert",
      practiceId: this.practiceId,
      audioId: this.recordId,
      content: content
    };
    this.noticeService.sendNotice(data).subscribe(
      data => {
        this.isApplied = true;
        this.createNotification("已成功申请专家评分");
      },
      errors => {
        if (errors !== undefined) {
          console.log(errors);
        }
      }
    );
  }

  createNotification(content: string): void {
    this.notification.config({
      nzPlacement: "topLeft"
    });
    this.notification.blank("成功提示", content);
  }
}
