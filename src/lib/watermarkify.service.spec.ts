import { TestBed } from '@angular/core/testing';

import { WatermarkifyService } from './watermarkify.service';

describe('WatermarkifyService', () => {
  let service: WatermarkifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatermarkifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
