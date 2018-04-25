import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MishapsComponent } from './mishaps.component';

describe('MishapsComponent', () => {
  let component: MishapsComponent;
  let fixture: ComponentFixture<MishapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MishapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MishapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
