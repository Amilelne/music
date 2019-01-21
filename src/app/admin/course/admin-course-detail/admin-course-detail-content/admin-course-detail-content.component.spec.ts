import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseDetailContentComponent } from './admin-course-detail-content.component';

describe('AdminCourseDetailContentComponent', () => {
  let component: AdminCourseDetailContentComponent;
  let fixture: ComponentFixture<AdminCourseDetailContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCourseDetailContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
