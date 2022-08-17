import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { TaskItemComponent } from './Components/task-item/task-item.component';
import { TaskListComponent } from './Components/task-list/task-list.component';
import { AboutComponent } from './Components/about/about.component';

import { HeadermenuComponent } from './Components/header-menu/header-menu.component';
import { ProductComponent } from './Components/product/product.component';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { AuthGuard, RoleGuard, LoginGuard } from './shared/auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { ShoppingListComponent } from './Components/shopping-list/shopping-list.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { ForgotpasswordComponent } from './Components/forgotpassword/forgotpassword.component';
import { CheckoutnewComponent } from './Components/checkoutnew/checkoutnew.component';
import { ContactComponent } from './Components/contact/contact.component';
import { BlogComponent } from './Components/blog/blog.component';
import { BloglistComponent,homeChildRoutes } from './Components/bloglist/bloglist.component';
import { AlterblogsComponent } from './Components/alterblogs/alterblogs.component';
import { BlogdetailsComponent } from './Component/blogdetails/blogdetails.component';

const routes: Routes = [
{path:'', component:LoginComponent, canActivate:[LoginGuard]},   
{path:"login", component: LoginComponent, canActivate:[LoginGuard]},
{path:"tasklist", component: TaskListComponent, canActivate:[AuthGuard]},
{path:"header", component: HeadermenuComponent, canActivate:[AuthGuard]},
{path:"shopping", component: ShoppingListComponent, canActivate:[AuthGuard]},
{path:"user", component: UsersListComponent, canActivate:[AuthGuard, RoleGuard]},
{path:"reg", component: RegistrationComponent},
{path:"forgotpassword", component: ForgotpasswordComponent},

{path:"cart", component: ShoppingCartComponent},
{path:"checkout", component: CheckoutComponent},
{path:"checkoutnew", component: CheckoutnewComponent},
{path:"contact", component: ContactComponent},
{path:"bloglist", component: AlterblogsComponent, children:[
  {
  path:'', component:BloglistComponent
},{
  path:'blog', component:BlogComponent
},
{
  path:'detail', component:BlogdetailsComponent
},{
path:'edit', component:BlogComponent
}
]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes), ToastrModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
