import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtCentreComponent } from './at-centre.component';

describe('AtCentreComponent', () => {
  let component: AtCentreComponent;
  let fixture: ComponentFixture<AtCentreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtCentreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
