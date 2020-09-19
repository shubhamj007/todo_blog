import { TestBed } from '@angular/core/testing';
import { HomeService } from './home.service';
describe('HomeService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(HomeService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=home.service.spec.js.map