import { Component, OnInit } from '@angular/core';
import { MyBlogService } from 'src/app/services/my-blog.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
// import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';



@Component({
  selector: 'app-my-blog',
  templateUrl: './my-blog.component.html',
  styleUrls: ['./my-blog.component.css'],
  // providers: [NgbAccordionConfig]
})
export class MyBlogComponent implements OnInit {
  public blogs = [];
  public id: number = null;
  public userData: any;
  constructor(
    private myBlogService: MyBlogService,
    private toastr: ToastrService,
    private router: Router,
    private localStorage: LocalStorageService,
    // config: NgbAccordionConfig

  ) {
    // config.closeOthers = true;
    // config.type = 'info';
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getBlogByUserId(this.userData.id);
  }

  getBlogByUserId(userId: number) {
    this.myBlogService.showMyBlog(userId)
    .subscribe((response: any) => {
            console.log('--response of show--', response);
            return this.blogs = response.blog_outcomes;
          }, error => {
            console.log('--error of register--', error);
          });
  }

  remove(blogid) {
   if (confirm('Are you sure to delete blog?' + blogid)){
    this.myBlogService.delete(blogid)
    .subscribe((response) => {
      this.getBlogByUserId(this.userData.id);
      this.toastr.success(response['message']);
    });
   }
  }

  editblog(id): void {
    this.router.navigate(['/blog/' + id]);
  }

}


