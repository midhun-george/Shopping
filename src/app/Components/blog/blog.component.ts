import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

import {GlobalsService  } from '../../Services/globals.service';
import { Editor, Toolbar } from 'ngx-editor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Routes ,Router,ActivatedRoute} from '@angular/router';
import { BlogService} from '../../Services/blog.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogForm:FormGroup;
  imageChangedEvent: any = '';
  imageBase64String='';
  croppedImage: any = '';
  editor: Editor;
  base4Img:'';
  editorConfig = {
    editable: true,
    spellcheck: false,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Type something. Test the Editor... ヽ(^。^)丿',
    translate: 'no'
  };
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  html: '';
  details
  uploaded:boolean = false;
  constructor(private globals:GlobalsService, private fb:FormBuilder, private blogs:BlogService, 
      private route: ActivatedRoute, private router:Router) { }
  
    ngOnInit(): void {
      this.editor = new Editor();
      this.globals.showLoader = false;
      this.initiateForm();
      
      // this.route.paramMap.subscribe(function(param){
      //   debugger;
      // })
      console.log(this.route.snapshot.queryParams)
      this.details = this.route.snapshot.queryParams;
      if(this.details){
        this.blogForm.controls['Title'].setValue(this.details.Title);
        this.blogForm.controls['Author'].setValue(this.details.Author);
        this.blogForm.controls['Description'].setValue(this.details.Description);
       this.imageBase64String = this.details.BlogImg
      }
      
    }
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      this.uploaded = true;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      
      
      this.base4Img = this.croppedImage;
  }
  imageLoaded(image: LoadedImage) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  initiateForm(){
    this.blogForm = this.fb.group({
      Title:['', Validators.required],
      Author:[''],
      Description:[''],
      BlogImg:['']
    })
  }

  saveData(){
    if(!this.details){
      let blog = this.blogForm.value;
      blog.BlogImg = this.base4Img;

      this.blogs.addBlogs(blog).subscribe({
        next:(res)=>{
          alert("Saved successfully");
        },
        error:()=>{
          alert("Error");
        }

      })
    
    }else{
      let blog = this.blogForm.value;
      blog.BlogImg = this.base4Img;
      blog.id= this.details.id;
      this.blogs.updateBlog(blog)
      .subscribe({
        next:(res)=>{
          alert("Updated Successfully");
        },
        error:()=>{
          alert("Error");
        }
      })
      
    }
  }
}
