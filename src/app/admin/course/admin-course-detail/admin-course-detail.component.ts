import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-admin-course-detail',
  templateUrl: './admin-course-detail.component.html',
  styleUrls: ['./admin-course-detail.component.scss']
})
export class AdminCourseDetailComponent implements OnInit {
  constructor(private router: Router, private courseService: CourseService) {}

  courseDetail: any;
  ngOnInit() {
    const ID = this.router.url.split('/').slice(-1)[0];
    this.courseService.getCourseDetail(ID).subscribe(data => {
      this.courseDetail = data;
    });
  }
}
