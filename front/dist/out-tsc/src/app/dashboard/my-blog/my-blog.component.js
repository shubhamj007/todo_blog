import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MyBlogService } from 'src/app/services/my-blog.service';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
var MyBlogComponent = /** @class */ (function () {
    function MyBlogComponent(myBlogService, toastr, router, localStorage, config) {
        this.myBlogService = myBlogService;
        this.toastr = toastr;
        this.router = router;
        this.localStorage = localStorage;
        this.blogs = [];
        this.id = null;
        config.closeOthers = true;
        config.type = 'info';
    }
    MyBlogComponent.prototype.ngOnInit = function () {
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.getBlogByUserId(this.userData.id);
    };
    MyBlogComponent.prototype.getBlogByUserId = function (userId) {
        var _this = this;
        this.myBlogService.showMyBlog(userId)
            .subscribe(function (response) {
            console.log('--response of show--', response);
            return _this.blogs = response.blog_outcomes;
        }, function (error) {
            console.log('--error of register--', error);
        });
    };
    MyBlogComponent.prototype.remove = function (blogid) {
        var _this = this;
        this.myBlogService.delete(blogid)
            .subscribe(function (response) {
            _this.getBlogByUserId(_this.userData.id);
            _this.toastr.success(response['message']);
        });
    };
    MyBlogComponent.prototype.editblog = function (id) {
        this.router.navigate(['/blog/' + id]);
    };
    MyBlogComponent = tslib_1.__decorate([
        Component({
            selector: 'app-my-blog',
            templateUrl: './my-blog.component.html',
            styleUrls: ['./my-blog.component.css'],
            providers: [NgbAccordionConfig]
        }),
        tslib_1.__metadata("design:paramtypes", [MyBlogService,
            ToastrService,
            Router,
            LocalStorageService,
            NgbAccordionConfig])
    ], MyBlogComponent);
    return MyBlogComponent;
}());
export { MyBlogComponent };
//# sourceMappingURL=my-blog.component.js.map