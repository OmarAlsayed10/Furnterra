import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsService } from '../../../services/products/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collections',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './collections.component.html',
  styles: ``
})
export class CollectionsComponent implements OnInit {
    currentCollectionName:string='';
  searchTerm = '';
    products:any[]=[]

    constructor(private route:ActivatedRoute,private productservice:ProductsService){}

    ngOnInit(): void {
      this.route.params.subscribe(params=>{
        const category = params['category']
        this.currentCollectionName=category
        this.productservice.getByCategory(category).subscribe((data:any)=>{
          this.products=data
        })
      })
    }

      filteredProducts() {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
