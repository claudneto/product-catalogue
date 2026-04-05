import { TestBed } from '@angular/core/testing';

import { BrandStorage } from './brand-storage';

describe('BrandStorageService', () => {
  let service: BrandStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
