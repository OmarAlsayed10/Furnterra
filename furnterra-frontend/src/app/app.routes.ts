import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent:()=>import('./pages/home/home.component').then(m=>m.HomeComponent)
    },
    {
        path:'about',
        loadComponent:()=>import('./pages/about/about.component').then(m=>m.AboutComponent)
    },

    {
        path:'login',loadComponent:()=>import ('./auth/login/login.component').then(m=>m.LoginComponent)
    },
    {
        path:'register',
        loadComponent:()=>import('./auth/register/register.component').then(m=>m.RegisterComponent)
    },
    {
        path:'verify-otp',
        loadComponent:()=>import('./auth/otp/otp.component').then(m=>m.OTPComponent)
    },
    {
        path:'products',
        loadComponent:()=>import('./pages/products/products.component').then(m=>m.ProductsComponent)
    },
    {
        path:'blogs',
        loadComponent:()=>import("./pages/blogs/blogs.component").then(m=>m.BlogsComponent),
    },
    {
        path:'products/:collections',
        loadComponent:()=>import("./pages/products/collections/collections.component").then(m=>m.CollectionsComponent)
    }
];
