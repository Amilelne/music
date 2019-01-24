import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { CourseService } from '../../course.service';
import { log } from 'async';

@Component({
  selector: 'app-admin-course-detail-content',
  templateUrl: './admin-course-detail-content.component.html',
  styleUrls: ['./admin-course-detail-content.component.scss']
})
export class AdminCourseDetailContentComponent implements OnInit {
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
  isVisible = false;
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
  data = [
    {
      title: 'Ant Design Title 1'
    },
    {
      title: 'Ant Design Title 2'
    },
    {
      title: 'Ant Design Title 3'
    },
    {
      title: 'Ant Design Title 4'
    }
  ];
  ngOnInit() {}

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
    console.log('status');
    if (status !== 'uploading') {
      console.log(file, fileList);
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
    this.courseService.createTutorial(this.validateForm.value).subscribe(
      ({ addTutorial: { filename } }) => {},
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
