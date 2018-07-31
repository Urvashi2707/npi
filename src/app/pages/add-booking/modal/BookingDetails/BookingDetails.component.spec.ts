import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetails } from './BookingDetails.component';

describe('BookingDetails', () => {
  let component: BookingDetails;
  let fixture: ComponentFixture<BookingDetails>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingDetails ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
