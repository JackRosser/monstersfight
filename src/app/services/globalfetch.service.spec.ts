import { TestBed } from '@angular/core/testing';

import { GlobalfetchService } from './globalfetch.service';

describe('GlobalfetchService', () => {
  let service: GlobalfetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalfetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
