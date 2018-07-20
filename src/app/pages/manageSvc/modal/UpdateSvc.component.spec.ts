import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSvcComponent } from './UpdateSvc.component';

describe('UpdateSvcComponent', () => {
  let component: UpdateSvcComponent;
  let fixture: ComponentFixture<UpdateSvcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSvcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSvcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
