import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
var AuthInterceptService = /** @class */ (function () {
    function AuthInterceptService(localstorage, route) {
        this.localstorage = localstorage;
        this.route = route;
    }
    AuthInterceptService.prototype.intercept = function (req, next) {
        return next.handle(req);
    };
    AuthInterceptService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [LocalStorageService,
            Router])
    ], AuthInterceptService);
    return AuthInterceptService;
}());
export { AuthInterceptService };
//# sourceMappingURL=auth-intercept.service.js.map