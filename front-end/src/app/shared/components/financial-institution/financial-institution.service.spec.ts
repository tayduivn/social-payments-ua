import { TestBed, inject } from '@angular/core/testing';

import { FinancialInstitutionService } from './financial-institution.service';

describe('FinancialInstitutionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinancialInstitutionService]
    });
  });

  it('should be created', inject([FinancialInstitutionService], (service: FinancialInstitutionService) => {
    expect(service).toBeTruthy();
  }));
});
