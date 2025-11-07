import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [RouterLink, CommonModule],
  templateUrl: './products.component.html',
  styles: ``
})
export class ProductsComponent implements OnInit {
  categories: string[] = []
  primaryCategories: string[] = []
  otherCategories: string[] = []
  categoryImages: { [key: string]: string } = {};

  constructor(private productsService: ProductsService) { }
  ngOnInit(): void {
    this.productsService.getCategories().subscribe((category) => {
      this.categories = category || []
      this.primaryCategories = this.categories.slice(0, 6)
      this.otherCategories = this.categories.slice(6)
      category.forEach(cat => {
        this.productsService.getByCategory(cat).subscribe((res) => {
          if (res.items.length > 0 && res.items[0].images && res.items[0].images.length > 0) {
            this.categoryImages[cat] = res.items[0].images[0]
          }
        })
      });
    })
  }
}
