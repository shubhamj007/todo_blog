import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { ToastrService } from 'ngx-toastr';
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(formBuilder, registrationService, toastr) {
        this.formBuilder = formBuilder;
        this.registrationService = registrationService;
        this.toastr = toastr;
        this.registerForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', Validators.required],
            mobile_number: ['', Validators.required],
            password: ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(6)
                ])],
            dob: ['', Validators.required]
        });
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        console.log('--this.loginForm.value--', this.registerForm.value);
        this.registrationService.register({
            "first_name": this.registerForm.value.first_name,
            "last_name": this.registerForm.value.last_name,
            "email": this.registerForm.value.email,
            "password": this.registerForm.value.password,
            "mobile": this.registerForm.value.mobile_number,
            "birth_date": this.registerForm.value.dob
        })
            .subscribe(function (response) {
            _this.toastr.success("User register successfully");
        }, function (error) {
            console.log('--error of register--', error);
        });
    };
    RegisterComponent = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            RegistrationService,
            ToastrService])
    ], RegisterComponent);
    return RegisterComponent;
}());
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map