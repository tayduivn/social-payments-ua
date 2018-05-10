import { TestBed, inject } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';

import { UsersService } from './users.service';

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        {
          provide: Apollo,
          useValue: {}
        }
      ]
    });
  });
});
