import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditComponent } from './add_credit.component';

describe('NeftComponent', () => {
  let component: AddCreditComponent;
  let fixture: ComponentFixture<AddCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
