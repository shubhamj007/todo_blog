import { TestBed } from '@angular/core/testing';

import { AuthInterceptService } from './auth-intercept.service';

describe('AuthInterceptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthInterceptService = TestBed.get(AuthInterceptService);
    expect(service).toBeTruthy();
  });
});
