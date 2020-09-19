import { TestBed } from '@angular/core/testing';

import { NoAuthguardService } from './no-authguard.service';

describe('NoAuthguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoAuthguardService = TestBed.get(NoAuthguardService);
    expect(service).toBeTruthy();
  });
});
