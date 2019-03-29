import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../user.service";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"]
})
export class UserDetailComponent implements OnInit {
  validateForm: FormGroup;
  private userId;
  user;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    // get user id
    this.route.params.subscribe(params => {
      this.userId = params.id;
      this.userService.getUserById(this.userId).subscribe(user => {
        this.user = user;
      });
    });
    this.validateForm = this.fb.group({
      name: [[""]],
      role: ["", [Validators.required]],
      level: [""]
    });
  }

  createMessage(type: string, content: string): void {
    this.message.create(type, content);
  }
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.userService
      .updateUserRole(this.userId, this.validateForm.value["role"])
      .subscribe(data => {
        if (data) this.createMessage("success", "成功更新用户身份");
        else this.createMessage("error", "更新用户身份失败，请重试！");
      });
  };
}
