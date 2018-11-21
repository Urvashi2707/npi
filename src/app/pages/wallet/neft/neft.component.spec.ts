import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeftComponent } from './neft.component';

describe('NeftComponent', () => {
  let component: NeftComponent;
  let fixture: ComponentFixture<NeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
