import { Component, OnInit, Input } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseService } from 'app/admin/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { Practice } from '@app/gql';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  @Input() practiceDetail: Practice;
  constructor(
    private domSanitizer: DomSanitizer,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}
  // Lets initiate Record OBJ
  private record;
  // Will use this flag for detect recording
  private recording = false;
  // Url of Blob
  private url;
  private blobFile;
  private error;
  ngOnInit() {
    this.getPracticeDetail();
  }

  getPracticeDetail() {
    const id = this.route.snapshot.paramMap.get('id');
    this.courseService.getPracticeDetail(id).subscribe(data => {
      this.practiceDetail = data;
    });
  }
  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  // Start recording.
  initiateRecording() {
    this.recording = true;
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
      mimeType: 'audio/wav',
      numberOfAudioChannels: 1
    };
    // Start Actuall Recording
    const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }

  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
    console.log(this.url);
  }

  uploadRecording() {
    this.courseService.singleUploadFile(this.record.blob).subscribe(
      ({ singleUpload: { filename, mimetype, encoding } }) => {
        console.log(filename);
      },
      errors => {
        if (errors !== undefined) {
          console.log(errors);
        }
      }
    );
  }
  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }
}
