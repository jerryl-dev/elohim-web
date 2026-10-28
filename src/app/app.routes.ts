import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Shop } from './pages/shop/shop';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Account } from './pages/account/account';
import { authGuard } from './core/guards/auth.guard';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Home },
  { path: 'shop', component: Shop },
  { path: 'shop/:id', component: ProductDetail },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'account', component: Account, canActivate: [authGuard] },
  { path: 'services', component: Services },
  { path: 'about', component: About },
  { path: '**', redirectTo: '' },
];