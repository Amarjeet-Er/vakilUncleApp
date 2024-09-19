import { TestBed } from '@angular/core/testing';

import { LazorpayService } from './lazorpay.service';

describe('LazorpayService', () => {
  let service: LazorpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazorpayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
