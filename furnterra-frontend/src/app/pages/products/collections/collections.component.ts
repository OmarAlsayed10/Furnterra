import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsService } from '../../../services/products/products.service';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-collections',
  imports: [CommonModule, FormsModule, RouterModule, PaginationComponent],
  templateUrl: './collections.component.html',
})
export class CollectionsComponent implements OnInit {
  currentCollectionName: string = '';
  searchTerm = '';
  products: any[] = [];
    totalPages = 1;
    currentPage = 1;

  constructor(
    private route: ActivatedRoute,
    private productservice: ProductsService
  ) { }

  ngOnInit(): void {
    this.loadProducts(1, this.currentCollectionName);
    this.route.params.subscribe((params) => {
      this.currentCollectionName = params['category'];
      this.loadProducts(1, this.currentCollectionName);
    });
  }

  loadProducts(page: number, category: string) {
    this.productservice.getAll(page, 15, this.searchTerm, { category }).subscribe((res) => {
      this.products = res.items;
      this.totalPages = res.pagination.totalPages;
      this.currentPage = res.pagination.page;
    });
  }

  goToPage(page: number) {
    this.loadProducts(page, this.currentCollectionName)
  }

  onSearchChange() {
    this.loadProducts(1, this.currentCollectionName)
  }
}
