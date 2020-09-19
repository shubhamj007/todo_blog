import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
// import { EditorModule } from '@tinymce/tinymce-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginHeaderComponent } from './login/login-header/login-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { BlogComponent } from './dashboard/blog/blog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { UiSwitchModule } from 'ngx-ui-switch';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { MyBlogComponent } from './dashboard/my-blog/my-blog.component';
import { LoginFooterComponent } from './login/login-footer/login-footer.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent,
                LoginComponent,
                RegisterComponent,
                LoginHeaderComponent,
                DashboardComponent,
                HomeComponent,
                BlogComponent,
                MyBlogComponent,
                LoginFooterComponent
            ],
            imports: [
                BrowserModule,
                AppRoutingModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                NgbModule,
                BrowserAnimationsModule,
                ToastrModule.forRoot(),
            ],
            providers: [AuthenticationService],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map