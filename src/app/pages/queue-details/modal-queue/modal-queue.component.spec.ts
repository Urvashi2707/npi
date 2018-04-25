import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQueueComponent } from './modal-queue.component';

describe('ModalQueueComponent', () => {
  let component: ModalQueueComponent;
  let fixture: ComponentFixture<ModalQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
