import { TestBed } from '@angular/core/testing';

import { RamService } from './ram.service';

describe('RamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RamService = TestBed.get(RamService);
    expect(service).toBeTruthy();
  });
});
