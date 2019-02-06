import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailChapterComponent } from './course-detail-chapter.component';

describe('CourseDetailChapterComponent', () => {
  let component: CourseDetailChapterComponent;
  let fixture: ComponentFixture<CourseDetailChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDetailChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
