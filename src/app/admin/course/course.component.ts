import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  isVisible = false;
  constructor() {}

  ngOnInit() {}

  createPractice() {
    console.log(this.isVisible);
    this.isVisible = true;
  }
}
