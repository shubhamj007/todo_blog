import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, localStorageService) {
        this.http = http;
        this.localStorageService = localStorageService;
        this.apiUrl = 'http://localhost:3000/api';
        this.isStorage = localStorageService.isLocalStorageAvailable();
    }
    AuthenticationService.prototype.login = function (params) {
        var _this = this;
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.http.post(this.apiUrl + "/users/login", params, httpOptions).pipe(map(function (response) {
            if (response["success"]) {
                if (_this.isStorage) {
                    _this.localStorageService.setData('userData', response['user']);
                    _this.localStorageService.setData('token', response['token']);
                    _this.localStorageService.setData('isLoggedin', 'true');
                }
            }
            return response;
        }));
    };
    AuthenticationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            LocalStorageService])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map