import { NgModule1 } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { TaskItemComponent } from './Components/task-item/task-item.component';
import { TaskListComponent } from './Components/task-list/task-list.component';
import { AboutComponent } from './Components/about/about.component';

import { HeadermenuComponent } from './Components/header-menu/header-menu.component';
import { ProductComponent } from './Components/product/product.component';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { AuthGuard, RoleGuard } from './shared/auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { ShoppingListComponent } from './Components/shopping-list/shopping-list.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';

const routes: Routes = [{path:'', component:LoginComponent},   
{path:"login", component: LoginComponent},
{path:"tasklist", component: TaskListComponent, canActivate:[AuthGuard]},
{path:"header", component: HeadermenuComponent, canActivate:[AuthGuard]},
{path:"shopping", component: ShoppingListComponent, canActivate:[AuthGuard]},
{path:"user", component: UsersListComponent, canActivate:[AuthGuard, RoleGuard]},
{path:"cart", component: ShoppingCartComponent},
{path:"checkout", component: CheckoutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes), ToastrModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
