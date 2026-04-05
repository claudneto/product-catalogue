import { TestBed } from '@angular/core/testing';

import { BrandApi } from '@shared/services/api/brand-api';

describe('BrandService', () => {
  let service: BrandApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
