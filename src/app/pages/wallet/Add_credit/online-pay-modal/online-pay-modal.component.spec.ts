import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePayModalComponent } from './online-pay-modal.component';

describe('OnlinePayModalComponent', () => {
  let component: OnlinePayModalComponent;
  let fixture: ComponentFixture<OnlinePayModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinePayModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
