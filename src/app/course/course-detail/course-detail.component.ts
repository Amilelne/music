import { Component, OnInit, Input } from '@angular/core';
import { Course } from '@app/gql';
import { CourseService } from 'app/admin/course/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  @Input() courseDetail: Course;
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCourseDetail();
  }

  getCourseDetail() {
    const id = this.route.snapshot.paramMap.get('id');
    this.courseService.getCourseDetail(id).subscribe(data => {
      this.courseDetail = data;
      console.log(this.courseDetail);
    });
  }
}
