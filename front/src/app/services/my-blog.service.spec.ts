import { TestBed } from '@angular/core/testing';

import { MyBlogService } from './my-blog.service';

describe('MyBlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyBlogService = TestBed.get(MyBlogService);
    expect(service).toBeTruthy();
  });
});
