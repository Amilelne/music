import { Component, OnInit } from "@angular/core";
import { AuthService } from "./core/auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "music-ai";
  user;
  loggedIn;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService._user.subscribe(user => (this.user = user));
    this.authService.isLoggedIn$.subscribe(
      islogged => (this.loggedIn = islogged)
    );
  }
}
