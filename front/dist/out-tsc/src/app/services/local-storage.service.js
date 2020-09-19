import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var LocalStorageService = /** @class */ (function () {
    function LocalStorageService() {
    }
    LocalStorageService.prototype.isLocalStorageAvailable = function () {
        return typeof localStorage !== 'undefined';
    };
    LocalStorageService.prototype.setData = function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    };
    LocalStorageService.prototype.getData = function (key) {
        var data = localStorage.getItem(key);
        return JSON.parse(data);
    };
    LocalStorageService.prototype.remove = function (key) {
        delete localStorage[key];
        return this;
    };
    LocalStorageService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], LocalStorageService);
    return LocalStorageService;
}());
export { LocalStorageService };
//# sourceMappingURL=local-storage.service.js.map