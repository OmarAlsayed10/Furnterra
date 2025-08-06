import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertsService } from '../../shared/components/alert/alerts.service';

@Component({
  selector: 'app-products',
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './products.component.html',
  styles: ``
})
export class ProductsComponent implements OnInit {

  selectedProduct:any=null;
  

  selectedTab: 'details' | 'inventory' | 'price' ='details' ;
  
  products:any[]=[]
  
  editForm:FormGroup
  
  trackByProductId(index:number,product:any):string{
    return product._id
  }
  
  constructor(private service:ProductsService,router:Router,private fb:FormBuilder,private alert:AlertsService){
    this.editForm = this.fb.group({
      name:[""],
      description:[""],
      price:[""],
      discount:[""],
      brand:[""],
      category:[""],
      images:[""],
      inStock:[""],
      stock:[""],
      sold:[""]
    })
  }
  
  ngOnInit(): void {
    this.service.getAll().subscribe((res:any)=>{
      this.products=res
      
    })
  }

  deleteProduct(productId:string){
    this.service.deleteOne(productId).subscribe({
      next:()=>{
          this.products = this.products.filter(p=>p._id !== productId)
          this.alert.show("Product Deleted Successfully",'success')
      },
      error:()=>{
        this.alert.show("error occured",'error')
      }
    })
  }

  openSidebar(product:any){
    this.selectedProduct = {...product}
    this.selectedTab='details'

    this.editForm.patchValue({
            name:product.name,
      description:product.description,
      price:product.price,
      discount:product.discount,
      brand:product.brand,
      category:product.category,
      images:product.images,
      inStock:product.inStock,
      stock:product.stock,
      sold:product.sold,

    })
  }

  closeSidebar(){
    this.selectedProduct=null
  }
  

  selectTab(tab:'details'|'inventory'|'price'){
    this.selectedTab=tab
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


}
