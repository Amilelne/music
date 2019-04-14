import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { AuthService } from "../core/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  errorState: boolean;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.errorState = false;
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const identifier = this.validateForm.value["email"];
    const credential = this.validateForm.value["password"];
    this.authService.login({ identifier, credential }).subscribe(
      () => {
        if (AuthService.getStoredUserRole() == "admin") {
          this.router.navigate(["/admin"]);
        } else this.router.navigate(["/"]);
      },
      errors => {
        this.errorState = true;
        this.errorMessage = errors[0].message;
      }
    );
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
