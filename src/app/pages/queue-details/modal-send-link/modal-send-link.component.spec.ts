import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSendLinkComponent } from './modal-send-link.component';

describe('ModalSendLinkComponent', () => {
  let component: ModalSendLinkComponent;
  let fixture: ComponentFixture<ModalSendLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSendLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSendLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
