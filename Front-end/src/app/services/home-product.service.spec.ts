import { TestBed } from '@angular/core/testing';

import { HomeProductService } from './home-product.service';

describe('HomeProductService', () => {
  let service: HomeProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
