import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { Observable, Observer } from "rxjs";
import { CourseService } from "../course.service";
import { Router } from "@angular/router";
import { NzMessageService, UploadXHRArgs } from "ng-zorro-antd";
import { AuthService } from "app/core/auth/auth.service";

@Component({
  selector: "app-add-course",
  templateUrl: "./add-course.component.html",
  styleUrls: ["./add-course.component.scss"]
})
export class AddCourseComponent implements OnInit {
  private isVisibleValue = false;

  @Output() isVisibleChange = new EventEmitter();
  @Input()
  set isVisible(input: boolean) {
    this.isVisibleValue = input;
    this.isVisibleChange.emit(input);
  }
  get isVisible() {
    return this.isVisibleValue;
  }
  isOkLoading = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService,
    private msg: NzMessageService
  ) {
    let userId = AuthService.getStoredUserId();
    this.validateForm = this.fb.group({
      title: ["", [Validators.required], [this.titleAsyncValidator]],
      kind: [[], [Validators.required]],
      level: [[], [Validators.required]],
      price: [0.0, [Validators.required]],
      description: ["", [Validators.required]],
      pictureUrl: [""],
      createId: [userId]
    });
  }
  validateForm: FormGroup;
  errorState: boolean;
  errorMessage: string;
  listOfKind = [
    { value: 1, label: "乐理" },
    { value: 2, label: "视唱" },
    { value: 3, label: "练耳" }
  ];
  listOfLevel = [
    { value: 1, label: "易" },
    { value: 2, label: "偏易" },
    { value: 3, label: "适中" },
    { value: 4, label: "难" },
    { value: 5, label: "偏难" }
  ];
  ngOnInit() {}

  uploadFile = (item: UploadXHRArgs) => {
    const file = item.file;
    console.log(file, file.name);

    return this.courseService.singleUploadFile(file).subscribe(
      ({ singleUpload: { filename, mimetype, encoding } }) => {
        item.onSuccess(filename, item.file, mimetype);
        console.log(filename);
        this.validateForm.controls["pictureUrl"].setValue(filename);
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
  };

  onChange(evt) {
    this.uploadFile(evt.target.files);
  }

  handleChange({ file, fileList }): void {
    const status = file.status;
    if (status !== "uploading") {
    }
    if (status === "done") {
      this.msg.success(`${file.name} 文件上传成功.`);
    } else if (status === "error") {
      this.msg.error(`${file.name} 文件上传失败.`);
    }
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.courseService.createCourse(value).subscribe(
      ({ addCourse: { id } }) => {
        this.router.navigate(["/admin/course", id]);
      },
      errors => {
        console.log(errors);
        this.errorState = true;
        this.errorMessage = errors.message;
      }
    );
  };

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
        if (control.value === "JasonWood") {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  showModal(): void {
    this.isVisibleValue = true;
  }

  handleOk(): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.courseService.createCourse(this.validateForm.value).subscribe(
      ({ addCourse: { id } }) => {
        this.router.navigate(["/admin/course", id]);
      },
      errors => {
        this.errorState = true;
        this.errorMessage = errors[0].message || errors.message;
      }
    );
    this.isOkLoading = true;
    window.setTimeout(() => {
      this.isVisibleValue = false;
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
