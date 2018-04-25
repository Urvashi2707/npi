import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPickupComponent } from './modal-pickup.component';

describe('ModalPickupComponent', () => {
  let component: ModalPickupComponent;
  let fixture: ComponentFixture<ModalPickupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPickupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
