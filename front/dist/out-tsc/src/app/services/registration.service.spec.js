import { TestBed } from '@angular/core/testing';
import { RegistrationService } from './registration.service';
describe('RegistrationService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(RegistrationService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=registration.service.spec.js.map