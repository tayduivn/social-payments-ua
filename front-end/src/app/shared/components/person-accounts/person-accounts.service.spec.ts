import { TestBed, inject } from '@angular/core/testing';

import { PersonAccountsService } from './person-accounts.service';

describe('PersonAccountsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonAccountsService]
    });
  });

  it('should be created', inject([PersonAccountsService], (service: PersonAccountsService) => {
    expect(service).toBeTruthy();
  }));
});
