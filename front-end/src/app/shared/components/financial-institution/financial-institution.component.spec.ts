import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialInstitutionComponent } from './financial-institution.component';

describe('FinancialInstitutionComponent', () => {
  let component: FinancialInstitutionComponent;
  let fixture: ComponentFixture<FinancialInstitutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialInstitutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
