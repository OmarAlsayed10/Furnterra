import { Routes } from '@angular/router';
import { AdminGuard } from './shared/guards/admin.guard.ts.js';
import { publicGuard } from './shared/guards/public.guard.js';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
  },

  {
    path:'products',
    loadComponent:() =>
      import('./pages/products/products.component').then((m)=>m.ProductsComponent)
  },

  {
    path:'collections/:category',
    loadComponent:()=>
      import('./pages/products/collections/collections.component').then((m)=>m.CollectionsComponent)
  },

    {
    path: 'products/:collections',
    loadComponent: () =>
      import('./pages/products/collections/collections.component').then(
        (m) => m.CollectionsComponent
      ),
  },

  {
    path:'product/:id',
    loadComponent:()=>
      import('./shared/components/product-details/product-details.component').then(m=>m.ProductDetailsComponent)
  },

  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'verify-otp',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./auth/otp/otp.component').then((m) => m.OTPComponent),
  },
  {
    path: 'blogs',
    loadComponent: () =>
      import('./pages/blogs/blogs.component').then((m) => m.BlogsComponent),
  },

  {
    path: 'dashboard',
    canActivate: [AdminGuard],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./dashboard/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'admins',
        loadComponent: () =>
          import('./dashboard/admins/admins.component').then(
            (m) => m.AdminsComponent
          ),
      },
      {
        path: 'blogs',
        loadComponent: () =>
          import('./dashboard/blogs/blogs.component').then(
            (m) => m.BlogsComponent
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./dashboard/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./dashboard/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
      },
      {
        path: 'addproducts',
        loadComponent: () =>
          import('./dashboard/addproducts/addproducts.component').then(
            (m) => m.AddproductsComponent
          ),
      },
      {
        path: 'addblogs',
        loadComponent: () =>
          import('./dashboard/addblogs/addblogs.component.js').then(
            (m) => m.addBlogComponent
          ),
      },
    ],
  },
  
];
