import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
// import { EditorModule } from '@tinymce/tinymce-angular';
import { MatButtonModule } from '@angular/material';
import { MatFileUploadModule } from 'angular-material-fileupload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginHeaderComponent } from './login/login-header/login-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { BlogComponent } from './dashboard/blog/blog.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { MyBlogComponent } from './dashboard/my-blog/my-blog.component';
import { LoginFooterComponent } from './login/login-footer/login-footer.component';
import { AuthInterceptService } from './services/auth-intercept.service';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DetailBlogComponent } from './dashboard/detail-blog/detail-blog.component';
// import { TruncateModule } from 'ng2-truncate';
import {TimeAgoPipe} from 'time-ago-pipe';
import { FooterComponent } from './dashboard/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoginHeaderComponent,
    DashboardComponent,
    HomeComponent,
    BlogComponent,
    MyBlogComponent,
    LoginFooterComponent,
    DetailBlogComponent,
    TimeAgoPipe,
    FooterComponent
  ],
  imports: [
    // TruncateModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularEditorModule,
    MatFileUploadModule,
    MatButtonModule,
    AngularFontAwesomeModule,
    // LazyLoadImageModule.forRoot({
    //   preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    // }),
    LazyLoadImageModule
    // EditorModule
  ],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
