import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes ,Router,ActivatedRoute} from '@angular/router';
import { GlobalsService } from '../../Services/globals.service'

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.css']
})
export class BlogdetailsComponent implements OnInit {

  constructor(private gs:GlobalsService, private route:Router, private r:ActivatedRoute) { }
a;
  ngOnInit(): void {
    this.getBlogdetails()
    this.gs.showLoader=false;
    
  }

  getBlogdetails(){
    this.a = history.state;
  }

  logout(){
    this.gs.logout()
  }
  editBlog(){
    
    //this.route.navigate(['../edit'],{queryParams: this.a})
    this.route.navigate(["../edit"], { relativeTo: this.r, queryParams: this.a });
  }
  deleteBlog(){

  }
}
