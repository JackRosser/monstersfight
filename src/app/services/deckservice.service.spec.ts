import { TestBed } from '@angular/core/testing';

import { DeckserviceService } from './deckservice.service';

describe('DeckserviceService', () => {
  let service: DeckserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
