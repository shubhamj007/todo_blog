import { TestBed } from '@angular/core/testing';
import { BlogService } from './blog.service';
describe('BlogService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(BlogService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=blog.service.spec.js.map