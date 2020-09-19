import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BlogService } from "src/app/services/blog.service";
import { ToastrService } from "ngx-toastr";
import { HomeService } from "src/app/services/home.service";
import { MyBlogService } from "src/app/services/my-blog.service";
import { ActivatedRoute } from "@angular/router";
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"]
})
export class BlogComponent implements OnInit {
  @ViewChild("myInput") myInputVariable: ElementRef;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    width: "70rem",
    placeholder: "Enter text here...",
    translate: "no",
    // uploadUrl: "/images", // if needed
    customClasses: [
      // optional
      {
        name: "quote",
        class: "quote"
      },
      {
        name: "redText",
        class: "redText"
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1"
      }
    ]
  };
  public blogForm: FormGroup;
  public blogs = [];
  public id: number = null;
  selectedFile: any;
  // public editedBlogImage: String;
  public blogImage: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private blogService: BlogService,
    private homeService: HomeService,
    private toastr: ToastrService,
    private myBlogService: MyBlogService,
    private activateRoute: ActivatedRoute
    
  ) {
    this.blogForm = this.fb.group({
      title: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(40)])
      ],
      description: [
        "",
        Validators.compose([Validators.required, Validators.minLength(100)])
      ],
      image: [""]
    });
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.id = +params.id;
      this.myBlogService.edit(this.id).subscribe((response: any) => {
        this.myBlogService.edit(this.id)
        this.blogImage =
          response && response.blog_outcomes
            ? response.blog_outcomes.imgUrl
            : "";
        this.blogForm.patchValue({
          title: response.blog_outcomes.title,
          description: response.blog_outcomes.description
        });
      });
    });
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.blogImage = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  addBlog(blogForm) {
    if (!this.id) {
      const formData = new FormData();
      formData.append("title", this.blogForm.value.title);
      formData.append("description", this.blogForm.value.description);
      formData.append("image", this.selectedFile);

      this.blogService.publish(formData).subscribe(
        (response: any) => {
          this.toastr.success("Blog post successfully");
          this.router.navigate(["/home"]);
        },
        error => {
          console.log("--error of register--", error);
        }
      );
    } else {
      const formData = new FormData();
      formData.append("title", this.blogForm.value.title);
      formData.append("description", this.blogForm.value.description);
      formData.append("image", this.selectedFile);
      this.blogService.blogEdit(this.id, formData).subscribe(
        (response: any) => {
          this.toastr.success("blog updated successfully");
          this.router.navigate(["/home"]);
        },
        error => {
          console.log("--error of register--", error);
        }
      );
    }
  }

  removeFile() {
    this.blogImage = "";
    this.selectedFile = "";
    this.myInputVariable.nativeElement.value = "";
    this.blogService.removeImage(this.id).subscribe(
      (response: any) => {
        this.blogImage = "";
        this.selectedFile = "";
      },
      error => {
        console.log("--error of register--", error);
      }
    );
  }
}
