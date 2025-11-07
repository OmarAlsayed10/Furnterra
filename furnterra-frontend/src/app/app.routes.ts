import { Routes } from '@angular/router';
import { AdminGuard } from './shared/guards/admin.guard';
import { publicGuard } from './shared/guards/public.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { formDeactivateGuard } from './shared/guards/form-deactivate.guard';
import { CartGuard } from './shared/guards/cart.guard';
import { ProfileComponent } from './pages/profile/profile.component';

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
    path:"profile/:id",
    canActivate:[AuthGuard],
    component:ProfileComponent
  },

  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products.component').then(
        (m) => m.ProductsComponent
      ),
  },

  {
    path: 'collections/:category',
    loadComponent: () =>
      import('./pages/products/collections/collections.component').then(
        (m) => m.CollectionsComponent
      ),
  },

  {
    path: 'products/:collections',
    loadComponent: () =>
      import('./pages/products/collections/collections.component').then(
        (m) => m.CollectionsComponent
      ),
  },

  {
    path: 'product/:id',
    loadComponent: () =>
      import(
        './pages/products/product-details/product-details.component.js'
      ).then((m) => m.ProductDetailsComponent),
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
    path: 'blogs/:id',
    loadComponent: () =>
      import('./pages/blogs/blogsdetails/blogsdetails.component').then(
        (m) => m.BlogsdetailsComponent
      ),
  },

  {
    path: 'contactus',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'address',
        loadComponent: () =>
          import('./pages/checkout/address/address.component').then(
            (m) => m.AddressComponent
          ),
        canDeactivate: [formDeactivateGuard],
        canActivate: [CartGuard],
      },
      {
        path: 'payment',
        loadComponent: () =>
          import('./pages/checkout/payment/payment.component').then(
            (m) => m.PaymentComponent
          ),
        canDeactivate: [formDeactivateGuard],
        canActivate: [CartGuard],
      },
      {
        path: 'showorder',
        loadComponent: () =>
          import('./pages/checkout/showorder/showorder.component').then(
            (m) => m.ShoworderComponent
          ),
        canActivate: [CartGuard],
      },
      { path: '', pathMatch: 'full', redirectTo: 'address' },
    ],
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
          import('./dashboard/admins/admin-panel/admin-panel.component').then(
            (m) => m.AdminPanelComponent
          ),
      },
      {
        path: 'addadmin',
        loadComponent: () =>
          import('./dashboard/admins/add-admins/add-admins.component').then(
            (m) => m.AddAdminsComponent
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
          import(
            './dashboard/products/addproducts/addproducts.component.js'
          ).then((m) => m.AddproductsComponent),
      },
      {
        path: 'addblogs',
        loadComponent: () =>
          import('./dashboard/blogs/addblogs/addblogs.component.js').then(
            (m) => m.addBlogComponent
          ),
      },
    ],
  },
];
