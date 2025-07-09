import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../products/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [RouterModule,CommonModule],
  templateUrl: './products.component.html',
  styles: ``
})
export class ProductsComponent implements OnInit {

  categories:string[]=[]
  categoryImages:{[key:string]:string}={}

  constructor(private productservice:ProductsService){}
  
   ngOnInit(): void {
    this.productservice.getAll().subscribe((products: any[]) => {
      const unique = new Set(products.map(p => p.category).filter(Boolean));
      this.categories = Array.from(unique);
   
      for(const product of products){
        if(
          product.category && product.images && product.images.length > 0 && !this.categoryImages[product.category]
        ){
          this.categoryImages[product.category]=product.images[0]
        }
      }
      
    });
  }
}
  


