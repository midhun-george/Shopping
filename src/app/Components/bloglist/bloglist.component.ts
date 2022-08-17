import { Component, OnInit } from '@angular/core';
import {GlobalsService  } from '../../Services/globals.service';
import { BlogService} from '../../Services/blog.service';
import { ActivatedRoute, Router, Routes} from '@angular/router'

import { BlogComponent } from '../../Components/blog/blog.component';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.css']
})
export class BloglistComponent implements OnInit {
  blogs
  constructor(private bs:BlogService, private globals:GlobalsService,
    private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit(): void {
    this.bs.getBlogs().subscribe({
      next:(res)=>{
        this.blogs=res;
        this.globals.showLoader = false;
      }
    })
  }

  ViewBlog(item){
    console.log(item);
    this.router.navigate(['blog'], {relativeTo:this.route});
  }
  logout(){
    this.globals.logout()
  }
}


// Define and export child routes of HomeComponent
export const homeChildRoutes: Routes = [
	
	{
		path: 'detail',
		component: BlogComponent
	},
	// {
	// 	path: 'update/:id',
	// 	component: StudentAddComponent
	// },
	// {
	// 	path: 'detail/:id',
	// 	component: StudentDetailsComponent
	// }
];