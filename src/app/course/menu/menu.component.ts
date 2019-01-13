import { Component, OnInit } from '@angular/core';
import {
  faMusic,
  faHeadphones,
  faMicrophone,
  faComments
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  faMusic = faMusic;
  faHeadphones = faHeadphones;
  faMicrophone = faMicrophone;
  faComments = faComments;
  constructor() {}

  ngOnInit() {}
}
