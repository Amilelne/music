import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { Observable, Observer } from "rxjs";
import { AuthService } from "app/core/auth/auth.service";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  constructor(private fb: FormBuilder, public authService: AuthService) {
    this.validateForm = this.fb.group({
      userName: ["", [Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      work: ["", [Validators.required]],
      city: ["", [Validators.required]],
      sex: ["", [Validators.required]],
      introduction: ["", [Validators.required]]
    });
  }

  validateForm: FormGroup;
  ngOnInit() {}
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  };

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }
}
