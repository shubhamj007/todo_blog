import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
var BlogService = /** @class */ (function () {
    function BlogService(http, localStorage) {
        this.http = http;
        this.localStorage = localStorage;
        this.apiUrl = 'http://localhost:3000/api';
    }
    BlogService.prototype.publish = function (params) {
        var token = JSON.parse(localStorage.getItem('token'));
        console.log('token:-------', token);
        var httpOptions = {
            headers: new HttpHeaders({
                //'Content-Type': 'application/json',
                'Authorization': token,
            })
        };
        console.log('27--params--', params);
        return this.http.post(this.apiUrl + "/blog", params, httpOptions);
    };
    BlogService.prototype.blogEdit = function (id, params) {
        var token = JSON.parse(localStorage.getItem('token'));
        console.log('token: ', token);
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token,
            })
        };
        return this.http.put(this.apiUrl + "/updateblog/" + id, params, httpOptions);
    };
    BlogService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            LocalStorageService])
    ], BlogService);
    return BlogService;
}());
export { BlogService };
//# sourceMappingURL=blog.service.js.map