import { TestBed } from '@angular/core/testing';
import { MyBlogService } from './my-blog.service';
describe('MyBlogService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(MyBlogService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=my-blog.service.spec.js.map