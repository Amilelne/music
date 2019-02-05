import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  @Input() isVisible = false;
  isOkLoading = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService
  ) {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required], [this.titleAsyncValidator]],
      kind: [[], [Validators.required]],
      level: [[], [Validators.required]],
      price: [0.0, [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
  validateForm: FormGroup;
  errorState: boolean;
  errorMessage: string;
  listOfKind = [
    { value: 0, label: '乐理' },
    { value: 1, label: '视唱' },
    { value: 2, label: '练耳' }
  ];
  listOfLevel = [
    { value: 1, label: '易' },
    { value: 2, label: '偏易' },
    { value: 3, label: '适中' },
    { value: 4, label: '难' },
    { value: 5, label: '偏难' }
  ];
  ngOnInit() {}
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.courseService.createCourse(value).subscribe(
      ({ addCourse: { id } }) => {
        this.router.navigate(['/admin/course', id]);
      },
      errors => {
        this.errorState = true;
        this.errorMessage = errors.message;
      }
    );
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  titleAsyncValidator = (control: FormControl) =>
    Observable.create((observer: Observer<ValidationErrors>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    })
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.courseService.createCourse(this.validateForm.value).subscribe(
      ({ addCourse: { id } }) => {
        this.router.navigate(['/admin/course', id]);
      },
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
