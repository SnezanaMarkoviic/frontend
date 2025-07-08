import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewsUserComponent } from './interviews-user.component';

describe('InterviewsUserComponent', () => {
  let component: InterviewsUserComponent;
  let fixture: ComponentFixture<InterviewsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewsUserComponent]
    });
    fixture = TestBed.createComponent(InterviewsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
