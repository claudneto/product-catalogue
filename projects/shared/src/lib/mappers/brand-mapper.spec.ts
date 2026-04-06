import { TestBed } from '@angular/core/testing';

import { BrandMapper } from './brand-mapper';

describe('BrandMapper', () => {
  let service: BrandMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandMapper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
