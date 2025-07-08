import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvertisementsComponent } from './edit-advertisements.component';

describe('EditAdvertisementsComponent', () => {
  let component: EditAdvertisementsComponent;
  let fixture: ComponentFixture<EditAdvertisementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAdvertisementsComponent]
    });
    fixture = TestBed.createComponent(EditAdvertisementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
