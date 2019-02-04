import { Component, OnInit } from '@angular/core';
import { CourseService } from 'app/admin/course/course.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  practices = [];
  constructor(private courseService: CourseService) {}
  ngOnInit() {
    this.courseService.getPracticeList().subscribe(data => {
      this.practices = data;
    });
  }
}
