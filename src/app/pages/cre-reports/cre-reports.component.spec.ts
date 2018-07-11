import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreReportsComponent } from './cre-reports.component';

describe('CreReportsComponent', () => {
  let component: CreReportsComponent;
  let fixture: ComponentFixture<CreReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
