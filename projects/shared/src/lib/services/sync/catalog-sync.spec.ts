import { TestBed } from '@angular/core/testing';

import { CatalogSync } from './catalog-sync';

describe('CatalogSync', () => {
  let service: CatalogSync;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogSync);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
