import { TestBed, inject } from '@angular/core/testing';

import { SelectPersonAccountDialogService } from './select-person-account-dialog.service';

describe('SelectPersonAccountDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectPersonAccountDialogService]
    });
  });

  it('should be created', inject([SelectPersonAccountDialogService], (service: SelectPersonAccountDialogService) => {
    expect(service).toBeTruthy();
  }));
});
