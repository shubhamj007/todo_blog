import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/services/home.service';
import { MyBlogService } from 'src/app/services/my-blog.service';
import { ActivatedRoute } from '@angular/router';
var BlogComponent = /** @class */ (function () {
    function BlogComponent(fb, router, blogService, homeService, toastr, myBlogService, activateRoute) {
        this.fb = fb;
        this.router = router;
        this.blogService = blogService;
        this.homeService = homeService;
        this.toastr = toastr;
        this.myBlogService = myBlogService;
        this.activateRoute = activateRoute;
        this.blogs = [];
        this.id = null;
        this.blogForm = this.fb.group({
            title: ['', Validators.compose([
                    Validators.required
                ])],
            description: ['', Validators.compose([
                    Validators.required
                ])],
            image: ['']
        });
        // this.blogForm.patchValue({ title: });
    }
    BlogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activateRoute.params.subscribe(function (params) {
            _this.id = +params['id'];
            _this.myBlogService.edit(_this.id)
                .subscribe(function (response) {
                _this.myBlogService.edit(_this.id);
                console.log('51--response----', response);
                _this.blogForm.patchValue({
                    title: response.blog_outcomes.title,
                    description: response.blog_outcomes.description,
                });
            });
        });
    };
    BlogComponent.prototype.onFileChanged = function (event) {
        this.selectedFile = event.target.files[0];
        console.log('60--this.selectedFile--', this.selectedFile);
    };
    BlogComponent.prototype.addBlog = function (blogForm) {
        var _this = this;
        if (!this.id) {
            console.log('--this.blogForm.value--', this.blogForm.value);
            var formData = new FormData();
            formData.append('title', this.blogForm.value.title);
            formData.append('description', this.blogForm.value.description);
            formData.append('image', this.selectedFile);
            this.blogService.publish(formData)
                .subscribe(function (response) {
                _this.toastr.success("Blog post successfully");
                _this.router.navigate(['/home']);
            }, function (error) {
                console.log('--error of register--', error);
            });
        }
        else {
            var formData = new FormData();
            formData.append('title', this.blogForm.value.title);
            formData.append('description', this.blogForm.value.description);
            formData.append('image', this.selectedFile);
            this.blogService.blogEdit(this.id, formData).subscribe(function (response) {
                _this.toastr.success("blog updated successfully");
            }, function (error) {
                console.log('--error of register--', error);
            });
        }
    };
    BlogComponent = tslib_1.__decorate([
        Component({
            selector: 'app-blog',
            templateUrl: './blog.component.html',
            styleUrls: ['./blog.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            Router,
            BlogService,
            HomeService,
            ToastrService,
            MyBlogService,
            ActivatedRoute])
    ], BlogComponent);
    return BlogComponent;
}());
export { BlogComponent };
//# sourceMappingURL=blog.component.js.map