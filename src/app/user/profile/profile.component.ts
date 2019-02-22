import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { AuthService } from "app/core/auth/auth.service";
import { ProfileUpdateService } from "../profileUpdate.service";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public profileUpdateService: ProfileUpdateService
  ) {
    this.validateForm = this.fb.group({
      name: ["", [Validators.required]],
      work: ["", [Validators.required]],
      city: ["", [Validators.required]],
      sex: ["0", [Validators.required]],
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
    let id;
    this.authService._user.subscribe(user => {
      id = user.id;
    });
    this.profileUpdateService.updateProfile(id, value).subscribe(
      ({ updateProfile }) => {
        //success
        this.authService._user.next(updateProfile);
      },
      errors => {
        if (errors !== undefined) {
          console.log(errors);
        }
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
}
