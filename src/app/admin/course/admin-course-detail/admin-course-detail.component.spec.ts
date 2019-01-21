import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseDetailComponent } from './admin-course-detail.component';

describe('AdminCourseDetailComponent', () => {
  let component: AdminCourseDetailComponent;
  let fixture: ComponentFixture<AdminCourseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCourseDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
