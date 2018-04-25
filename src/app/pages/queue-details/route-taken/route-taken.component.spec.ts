import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTakenComponent } from './route-taken.component';

describe('RouteTakenComponent', () => {
  let component: RouteTakenComponent;
  let fixture: ComponentFixture<RouteTakenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteTakenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteTakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
