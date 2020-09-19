import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogComponent } from './dashboard/blog/blog.component';
import { HomeComponent } from './dashboard/home/home.component';
import { DetailBlogComponent } from './dashboard/detail-blog/detail-blog.component';
import { MyBlogComponent } from './dashboard/my-blog/my-blog.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NoAuthguardService } from './services/no-authguard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate : [NoAuthguardService]},
  { path: 'register', component: RegisterComponent, canActivate : [NoAuthguardService]},
  { path: 'blog/:id', component: BlogComponent, canActivate : [AuthGuardService]},
  { path: 'my-blog', component: MyBlogComponent, canActivate : [AuthGuardService]},
  { path: 'blog', component: BlogComponent, canActivate : [AuthGuardService]},
  { path: 'blog-detail/:id', component: DetailBlogComponent, canActivate : [AuthGuardService]},
  { path: 'dashboard', component: DashboardComponent, canActivate : [AuthGuardService]},
  { path: 'home', component: HomeComponent},
  { path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
