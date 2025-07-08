import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyForAdvertisementComponent } from './apply-for-advertisement.component';

describe('ApplyForAdvertisementComponent', () => {
  let component: ApplyForAdvertisementComponent;
  let fixture: ComponentFixture<ApplyForAdvertisementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyForAdvertisementComponent]
    });
    fixture = TestBed.createComponent(ApplyForAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
