import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/core/auth/auth.service";
import { ProfileUpdateService } from "../profileUpdate.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public profileUpdateService: ProfileUpdateService
  ) {}

  ngOnInit() {}

  onFileChanged(event) {
    const file = event.target.files[0];
    console.log(this.authService.user.id, file);
    this.profileUpdateService
      .updateAvatar(this.authService.user.id, file)
      .subscribe(
        ({ updateAvatar: { filename, mimetype, encoding } }) => {
          //success
        },
        errors => {
          if (errors !== undefined) {
            console.log(errors);
          }
        }
      );
  }
}
