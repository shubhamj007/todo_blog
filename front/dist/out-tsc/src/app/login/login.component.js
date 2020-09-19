import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, authenticationService, router, toastr) {
        this.fb = fb;
        this.authenticationService = authenticationService;
        this.router = router;
        this.toastr = toastr;
        this.loginError = '';
        this.loginForm = this.fb.group({
            email: ['', Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                ])],
            password: ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(6)
                ])]
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.submit = function () {
        var _this = this;
        this.authenticationService.login({
            "email": this.loginForm.value.email,
            "password": this.loginForm.value.password,
        }).subscribe(function (response) {
            if (response) {
                _this.router.navigate(['/home']);
                // this.authenticationService.getToken();
                _this.toastr.success(response['message']);
            }
            else {
                // this.loginError = response['message'];
                // this.toastr.error(response['message'])
            }
        }, function (error) {
            _this.toastr.error(error.error.message);
        });
    };
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            AuthenticationService,
            Router,
            ToastrService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map