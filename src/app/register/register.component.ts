import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthService } from "../core/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;
  emailUnique: Boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const name = this.validateForm.value["nickname"];
    const identifier = this.validateForm.value["email"];
    const credential = this.validateForm.value["password"];
    this.authService.register({ name, identifier, credential }).subscribe(
      () => this.router.navigate(["/login"]),
      errors => {
        console.log(errors);
        if (errors[0].extensions.exception["code"] == 11000) {
          this.emailUnique = false;
        }
        console.log(errors[0].extensions.exception["code"] === 11000);
      }
    );
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]]
    });
  }
}
