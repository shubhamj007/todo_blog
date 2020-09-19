import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
var MyBlogService = /** @class */ (function () {
    function MyBlogService(http, localStorage) {
        this.http = http;
        this.localStorage = localStorage;
        this.apiUrl = 'http://localhost:3000/api';
    }
    MyBlogService.prototype.showMyBlog = function (id) {
        var token = JSON.parse(localStorage.getItem('token'));
        var httpOptions = {
            headers: new HttpHeaders({
                //  'Content-Type': 'application/json',
                'Authorization': token,
            })
        };
        return this.http.get(this.apiUrl + "/getMyBlog/" + id, httpOptions);
    };
    MyBlogService.prototype.delete = function (id) {
        var token = JSON.parse(localStorage.getItem('token'));
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token,
            })
        };
        return this.http.delete(this.apiUrl + "/deleteblog/" + id, httpOptions);
    };
    MyBlogService.prototype.edit = function (id) {
        var token = JSON.parse(localStorage.getItem('token'));
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token,
            })
        };
        return this.http.get(this.apiUrl + "/getBlogById/" + id, httpOptions);
    };
    MyBlogService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            LocalStorageService])
    ], MyBlogService);
    return MyBlogService;
}());
export { MyBlogService };
//# sourceMappingURL=my-blog.service.js.map