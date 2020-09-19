import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
// import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // providers:[NgbAccordionConfig]
})

// @Pipe({
//   name: 'limitTo'
// })
export class HomeComponent implements OnInit {
  public blogs = [];
  public samplePath : string = './../../../../assets/defalut_blog.jpg';

  constructor(
    // config: NgbAccordionConfig,
    private homeService: HomeService,
    private router: Router,
  ) {
    // config.closeOthers = true;
    // config.type = 'info';
   }

  ngOnInit() {
    this.homeService.show().subscribe(
      (response: any) => {
        this.blogs = response.blog_outcomes;
      }, error => {
        console.log('--error of register--', error);
      });
  }

  getBlogDetail(id): void{
    this.router.navigate(['/blog-detail/' + id]);
  }
}
