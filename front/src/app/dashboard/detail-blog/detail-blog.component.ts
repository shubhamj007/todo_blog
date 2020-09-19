import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { BlogService } from "src/app/services/blog.service";

@Component({
  selector: "app-detail-blog",
  templateUrl: "./detail-blog.component.html",
  styleUrls: ["./detail-blog.component.css"]
})
export class DetailBlogComponent implements OnInit {
  public id: number = null;
  public blogData: any;

  constructor(
    private toastr: ToastrService,
    private router: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.id = +params.id;
      this.blogService.details(this.id)
        .subscribe((response: any) => {
          this.blogData = response.blog_outcomes;
          console.log('this.blogData: -------', this.blogData);
        }, error => {
          console.log('--error of register--', error);
        });
    });
  }

}




