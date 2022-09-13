import { Routes }               from '@angular/router';
import { LoginComponent }       from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterComponent }    from './components/register/register.component';
import { LoggedInGuard }        from './guards/logged-in.guard';

export const ROUTES: Routes = [
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: '',
    pathMatch: 'full',
    canActivate: [LoggedInGuard],
    component: ProductListComponent
  }
];
