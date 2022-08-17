import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {MatNativeDateModule } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';



import { LoginComponent } from './Components/login/login.component';

import { ToastrModule } from 'ngx-toastr';
import { ToastComponent } from './Components/toast/toast.component';
import { AboutComponent } from './Components/about/about.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { AddTasksComponent } from './Components/add-tasks/add-tasks.component';
import { ButtonComponent } from './Components/button/button.component';
import { DialogComponent } from './Components/dialog/dialog.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { HeadermenuComponent } from './Components/header-menu/header-menu.component';
import { ProductComponent, ProductDialogComponent } from './Components/product/product.component';
import { TaskItemComponent } from './Components/task-item/task-item.component';
import { TaskListComponent } from './Components/task-list/task-list.component';

import { HttpClientModule } from '@angular/common/http';
import { AddProductDialogComponent } from './Components/add-product-dialog/add-product-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { NavComponent } from './Components/nav/nav.component';
import { ShoppingHeaderComponent } from './Components/shopping-header/shopping-header.component';
import { ShoppingListComponent, AddedCartComponent } from './Components/shopping-list/shopping-list.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';

import { FilterPipe } from './shared/filter.pipe';
import { LoaderComponent } from './Components/loader/loader.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { ForgotpasswordComponent } from './Components/forgotpassword/forgotpassword.component';
import { CheckoutnewComponent } from './Components/checkoutnew/checkoutnew.component';
import { ContactComponent } from './Components/contact/contact.component';
import { BlogComponent } from './Components/blog/blog.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxEditorModule } from 'ngx-editor';
import { AlterblogsComponent } from './Components/alterblogs/alterblogs.component';
import { BloglistComponent } from './Components/bloglist/bloglist.component';
import { BlogdetailsComponent } from './Component/blogdetails/blogdetails.component';
import { StringlengthPipe } from './stringlength.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToastComponent,
    AboutComponent,
    AddProductComponent,
    AddTasksComponent,
    ButtonComponent,
    DialogComponent,
    FooterComponent,
    HeaderComponent,
    HeadermenuComponent,
    ProductComponent,ProductDialogComponent,
    TaskItemComponent,
    TaskListComponent,
    AddProductDialogComponent,
    UsersListComponent,
    NavComponent,
    ShoppingHeaderComponent,
    ShoppingListComponent,
    AddedCartComponent,
    ShoppingCartComponent,
    
    FilterPipe,
    LoaderComponent,
    CheckoutComponent,
    RegistrationComponent,
    ForgotpasswordComponent,
    CheckoutnewComponent,
    ContactComponent,
    BlogComponent,
    AlterblogsComponent,
    BloglistComponent,
    BlogdetailsComponent,
    StringlengthPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,MatInputModule,MatButtonModule,MatDividerModule,
    MatDialogModule,MatToolbarModule,MatIconModule,MatCheckboxModule,MatFormFieldModule,MatSelectModule,
    MatDatepickerModule,MatRadioModule,MatTableModule,MatPaginatorModule,MatSortModule,MatSidenavModule,
    MatNativeDateModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxPaginationModule,
    ImageCropperModule,
    NgxEditorModule,
    MatExpansionModule,MatSnackBarModule,MatProgressSpinnerModule,
    MatMenuModule,
    MatListModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 15000, // 15 seconds
      progressBar: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
