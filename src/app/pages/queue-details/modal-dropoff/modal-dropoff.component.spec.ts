import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDropoffComponent } from './modal-dropoff.component';

describe('ModalDropoffComponent', () => {
  let component: ModalDropoffComponent;
  let fixture: ComponentFixture<ModalDropoffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDropoffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDropoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
