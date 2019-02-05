import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  SimpleChange,
  OnChanges
} from '@angular/core';
import { NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-add-practice',
  templateUrl: './add-practice.component.html',
  styleUrls: ['./add-practice.component.scss']
})
export class AddPracticeComponent implements OnInit, OnChanges {
  @Input() isVisible = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private msg: NzMessageService,
    private courseService: CourseService
  ) {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      resourceType: [[], [Validators.required]],
      level: [[], [Validators.required]],
      description: ['', [Validators.required]],
      resourceUrl: ['']
    });
  }
  isOkLoading = false;
  validateForm: FormGroup;
  errorState: boolean;
  errorMessage: string;
  listOfresourceType = [
    { value: 0, label: '图片' },
    { value: 1, label: '文档' },
    { value: 2, label: 'PPT' },
    { value: 3, label: '音频' },
    { value: 4, label: '视频' }
  ];
  listOfLevel = [
    { value: 1, label: '易' },
    { value: 2, label: '偏易' },
    { value: 3, label: '适中' },
    { value: 4, label: '难' },
    { value: 5, label: '偏难' }
  ];
  data: any[];
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const isVisible: SimpleChange = changes.isVisible;
    // console.log('prev value: ', isVisible.previousValue);
    // console.log('got value: ', isVisible.currentValue);
  }

  uploadFile = (item: UploadXHRArgs) => {
    const file = item.file;
    return this.courseService.singleUploadFile(file).subscribe(
      ({ singleUpload: { filename, mimetype, encoding } }) => {
        item.onSuccess(filename, item.file, mimetype);
        this.validateForm.controls['resourceUrl'].setValue(filename);
      },
      errors => {
        if (errors !== undefined) {
          console.log(errors);
          item.onError(errors, item.file);
          this.errorState = true;
          this.errorMessage = errors.message || errors[0].message;
        }
      }
    );
  }
  onChange(evt) {
    this.uploadFile(evt.target.files);
  }

  handleChange({ file, fileList }): void {
    const status = file.status;
    if (status !== 'uploading') {
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.courseService.createPractice(this.validateForm.value).subscribe(
      ({ addPractice: { filename } }) => {},
      errors => {
        this.errorState = true;
        this.errorMessage = errors.message;
      }
    );
    this.isOkLoading = true;
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 2000);
  }

  handleCancel(): void {
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.isVisible = false;
  }
}
