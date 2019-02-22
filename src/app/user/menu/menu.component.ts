import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/core/auth/auth.service";
import { ProfileUpdateService } from "../profileUpdate.service";
import { Router } from "@angular/router";
import { User, AuthCurrentUserGQL } from "@app/gql";
import { Observable } from "rxjs";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public profileUpdateService: ProfileUpdateService,
    private router: Router,
    private currentUser: AuthCurrentUserGQL
  ) {}

  ngOnInit() {}

  onFileChanged(event) {
    const file = event.target.files[0];
    let id;
    this.authService._user.subscribe(user => {
      id = user.id;
    });
    this.profileUpdateService.updateAvatar(id, file).subscribe(
      ({ updateAvatar }) => {
        //success
        this.authService._user.next(updateAvatar);
      },
      errors => {
        if (errors !== undefined) {
          console.log(errors);
        }
      }
    );
  }
}
