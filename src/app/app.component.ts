import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { User } from '@app/gql';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'music-ai';

  constructor(public authService: AuthService) {}

  ngOnInit() {}
}
