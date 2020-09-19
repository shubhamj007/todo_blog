import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
describe('LocalStorageService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(LocalStorageService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=local-storage.service.spec.js.map