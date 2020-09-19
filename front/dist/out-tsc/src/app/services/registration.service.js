import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var RegistrationService = /** @class */ (function () {
    function RegistrationService(http) {
        this.http = http;
        this.apiUrl = 'http://localhost:3000/api';
    }
    RegistrationService.prototype.register = function (params) {
        return this.http.post(this.apiUrl + "/users", params);
    };
    RegistrationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], RegistrationService);
    return RegistrationService;
}());
export { RegistrationService };
//# sourceMappingURL=registration.service.js.map