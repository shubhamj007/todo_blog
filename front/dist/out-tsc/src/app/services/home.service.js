import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var HomeService = /** @class */ (function () {
    function HomeService(http) {
        this.http = http;
        this.apiUrl = 'http://localhost:3000/api';
    }
    HomeService.prototype.show = function () {
        var token = JSON.parse(localStorage.getItem('token'));
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token,
            })
        };
        return this.http.get(this.apiUrl + "/blogdetail", httpOptions);
    };
    HomeService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], HomeService);
    return HomeService;
}());
export { HomeService };
//# sourceMappingURL=home.service.js.map