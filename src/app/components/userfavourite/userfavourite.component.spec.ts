import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserfavouriteComponent } from './userfavourite.component';

describe('UserfavouriteComponent', () => {
  let component: UserfavouriteComponent;
  let fixture: ComponentFixture<UserfavouriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserfavouriteComponent]
    });
    fixture = TestBed.createComponent(UserfavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
