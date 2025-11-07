import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [RouterModule, CommonModule],
  templateUrl: './products.component.html',
  styles: ``,
})
export class ProductsComponent implements OnInit {
  categories: string[] = [];
  categoryImages: { [key: string]: string } = {};

  constructor(private productservice: ProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productservice.getCategories().subscribe((res) => {
      this.categories = res
      res.forEach(category => {
        this.productservice.getByCategory(category).subscribe((res) => {
          console.log(res.items)
          if (res.items.length > 0 && res.items[0].images && res.items[0].images.length > 0) {
            this.categoryImages[category] = res.items[0].images[0]
          }
        })
      });

    });
  }  
}
