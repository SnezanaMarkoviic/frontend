import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreFeaturesComponent } from './explore-features.component';

describe('ExploreFeaturesComponent', () => {
  let component: ExploreFeaturesComponent;
  let fixture: ComponentFixture<ExploreFeaturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreFeaturesComponent]
    });
    fixture = TestBed.createComponent(ExploreFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
