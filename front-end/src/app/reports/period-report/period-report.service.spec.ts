import { TestBed, inject } from '@angular/core/testing';

import { PeriodReportService } from './period-report.service';

describe('PeriodReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeriodReportService]
    });
  });

  it('should be created', inject([PeriodReportService], (service: PeriodReportService) => {
    expect(service).toBeTruthy();
  }));
});
