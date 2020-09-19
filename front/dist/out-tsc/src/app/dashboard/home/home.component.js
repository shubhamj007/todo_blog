import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(config, homeService) {
        this.homeService = homeService;
        this.blogs = [];
        config.closeOthers = true;
        config.type = 'info';
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.homeService.show().subscribe(function (response) {
            console.log('23--response of show--', response);
            _this.blogs = response.blog_outcomes;
        }, function (error) {
            console.log('--error of register--', error);
        });
    };
    HomeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css'],
            providers: [NgbAccordionConfig]
        }),
        tslib_1.__metadata("design:paramtypes", [NgbAccordionConfig,
            HomeService])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map