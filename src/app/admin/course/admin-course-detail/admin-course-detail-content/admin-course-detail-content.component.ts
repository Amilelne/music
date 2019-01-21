import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-course-detail-content',
  templateUrl: './admin-course-detail-content.component.html',
  styleUrls: ['./admin-course-detail-content.component.scss']
})
export class AdminCourseDetailContentComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private msg: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      kind: [[], [Validators.required]],
      level: [[], [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
  isVisible = false;
  isOkLoading = false;
  validateForm: FormGroup;
  errorState: boolean;
  errorMessage: string;
  listOfKind = [
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

  handleChange({ file, fileList }): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file up''aded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }
}
