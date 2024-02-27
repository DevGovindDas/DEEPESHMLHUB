import { TestBed } from '@angular/core/testing';

import { GssServiceService } from './gss-service.service';

describe('GssServiceService', () => {
  let service: GssServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GssServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
