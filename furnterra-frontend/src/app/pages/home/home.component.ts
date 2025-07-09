import { Component } from '@angular/core';
import { HeroComponent } from "../../shared/components/hero/hero.component";
import { ProductsComponent } from '../../shared/components/products/products.component';
import { BestSellingComponent } from "../../shared/components/best-selling/best-selling.component";
import { SaleComponent } from "../../shared/components/sale/sale.component";
import { BlogsComponent } from "../../shared/components/blogs/blogs.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [HeroComponent, ProductsComponent, BestSellingComponent, SaleComponent, BlogsComponent],
})
export class HomeComponent {}
