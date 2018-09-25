import { TestBed } from '@angular/core/testing';

import { TabbedItemsService } from './tabbed-items.service';

describe('TabbedItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabbedItemsService = TestBed.get(TabbedItemsService);
    expect(service).toBeTruthy();
  });
});
