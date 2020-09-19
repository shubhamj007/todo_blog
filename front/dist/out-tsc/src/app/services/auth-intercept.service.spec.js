import { TestBed } from '@angular/core/testing';
import { AuthInterceptService } from './auth-intercept.service';
describe('AuthInterceptService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(AuthInterceptService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=auth-intercept.service.spec.js.map