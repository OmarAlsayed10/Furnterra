import { Component } from '@angular/core';
import { HeroComponent } from "../../components/hero/hero.component";
import { ProductsComponent } from '../../components/products/products.component';
import { BestSellingComponent } from "../../components/best-selling/best-selling.component";
import { SaleComponent } from "../../components/sale/sale.component";
import { BlogsComponent } from "../../components/blogs/blogs.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [HeroComponent, ProductsComponent, BestSellingComponent, SaleComponent, BlogsComponent],
})
export class HomeComponent {}
