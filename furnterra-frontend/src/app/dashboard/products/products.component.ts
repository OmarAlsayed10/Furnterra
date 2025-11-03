import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertsService } from '../../shared/components/alert/alerts.service';
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-products',
  imports: [RouterModule, CommonModule, ReactiveFormsModule, PaginationComponent,FormsModule],
  templateUrl: './products.component.html',
  styles: ``
})
export class ProductsComponent implements OnInit {

  selectedProduct: any = null;


  selectedTab: 'details' | 'inventory' | 'price' = 'details';

  products: any[] = []

  editForm: FormGroup

  totalPages = 1;
  currentPage = 1;
  searchTerm=""

  trackByProductId(index: number, product: any): string {
    return product._id
  }

  constructor(private service: ProductsService, private fb: FormBuilder, private alert: AlertsService) {
    this.editForm = this.fb.group({
      name: [""],
      description: [""],
      price: [""],
      discount: [""],
      brand: [""],
      category: [""],
      images: [""],
      inStock: [""],
      stock: [""],
      sold: [""]
    })
  }

  ngOnInit(): void {
    this.loadProducts(1)
  }

  loadProducts(page: number) {
    this.service.getAll(page, 15, this.searchTerm).subscribe((res) => {
      this.products = res.items;
      this.totalPages = res.pagination.totalPages;
      this.currentPage = res.pagination.page;
    });
  }

  deleteProduct(productId: string) {
    this.service.deleteOne(productId).subscribe({
      next: () => {
        this.products = this.products.filter(p => p._id !== productId)
        this.alert.show("Product Deleted Successfully", 'success')
      },
      error: () => {
        this.alert.show("error occured", 'error')
      }
    })
  }

  openSidebar(product: any) {
    this.selectedProduct = { ...product }
    this.selectedTab = 'details'

    this.editForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      discount: product.discount,
      brand: product.brand,
      category: product.category,
      images: product.images,
      inStock: product.inStock,
      stock: product.stock,
      sold: product.sold,

    })
  }

  closeSidebar() {
    this.selectedProduct = null
  }


  selectTab(tab: 'details' | 'inventory' | 'price') {
    this.selectedTab = tab
  }


  updateProduct() {
    if (!this.selectedProduct) return;

    const updatedProduct = {
      ...this.selectedProduct,
      ...this.editForm.value
    };

    this.service.update(this.selectedProduct._id, updatedProduct).subscribe({
      next: () => {
        const index = this.products.findIndex(p => p._id === this.selectedProduct._id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
        this.alert.show('Product updated successfully', 'success');
        this.closeSidebar();
      },
      error: () => {
        this.alert.show('Failed to update product', 'error');
      }
    });
  }

  goToPage(page: number) {
    this.loadProducts(page)
  }

  onSearchChange() {
    this.loadProducts(1)
  }


}
