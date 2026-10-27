import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Account } from './pages/account/account';
import { authGuard } from './core/guards/auth.guard';
import { Shop } from './pages/shop/shop';
import { ProductDetail } from './pages/product-detail/product-detail';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'shop' }, // temporary until the Home page (Sprint 3)
  { path: 'shop', component: Shop },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'account', component: Account, canActivate: [authGuard] },
  { path: 'shop/:id', component: ProductDetail },
];