import { TestBed, inject } from '@angular/core/testing';

import { SpDialogService } from './sp-dialog.service';

describe('SpDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpDialogService]
    });
  });

  it('should be created', inject([SpDialogService], (service: SpDialogService) => {
    expect(service).toBeTruthy();
  }));
});
