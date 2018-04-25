import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotcheckedinComponent } from './notcheckedin.component';

describe('NotcheckedinComponent', () => {
  let component: NotcheckedinComponent;
  let fixture: ComponentFixture<NotcheckedinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotcheckedinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotcheckedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
