import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'app/admin/course/course.service';

@Component({
  selector: 'app-course-detail-chapter',
  templateUrl: './course-detail-chapter.component.html',
  styleUrls: ['./course-detail-chapter.component.scss']
})
export class CourseDetailChapterComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  data: any[];
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.courseService.getCourseDetail(id).subscribe((data) => {
      this.data = data.tutorials;
    });
  }
}
