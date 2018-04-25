import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdvComponent } from './modal-adv.component';

describe('ModalAdvComponent', () => {
  let component: ModalAdvComponent;
  let fixture: ComponentFixture<ModalAdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
