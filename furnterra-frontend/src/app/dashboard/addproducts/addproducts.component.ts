import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../../shared/components/alert/alerts.service';
import { ImageUploaderComponent } from "../../shared/components/image-uploader/image-uploader.component";

@Component({
  selector: 'app-addproducts',
  imports: [ReactiveFormsModule, ImageUploaderComponent],
  templateUrl: './addproducts.component.html',
  styles: ``
})
export class AddproductsComponent implements OnInit {
  form!:FormGroup
  productid=''
  isEdit=false
  uploadImages:string[]=[]


  constructor(private fb:FormBuilder,private products:ProductsService,private router:Router,private route:ActivatedRoute,private alert:AlertsService){
    this.form = this.fb.group({
      name:["",Validators.required],
      description:["",Validators.required],
      price:["",Validators.required],
      discount:[""],
      brand:["",Validators.required],
      category:["",Validators.required],
      images:["",Validators.required],
      inStock:["",Validators.required],
      stock:["",Validators.required],
      sold:["",Validators.required]
    })
  }

  ngOnInit(): void {
    this.productid = this.route.snapshot.paramMap.get("id")!;
    if(this.productid){
      this.isEdit=true;
      this.products.getOne(this.productid).subscribe((product)=>{
        this.form.patchValue(product)
      })
    }
  }

  onImagesChanges(urls:string[]){
    this.uploadImages=urls
    this.form.patchValue({image:this.uploadImages})
  }

  onSubmit(){
        if(this.form.invalid){
      this.alert.show("Please fill out all required fields",'error')
      this.form.markAllAsTouched()
    }

    const dataToSend={
      ...this.form.value,
      images:this.uploadImages
    }

    if(this.isEdit){
      this.products.update(this.productid,dataToSend).subscribe(()=>this.router.navigate(['/dashboard/products']))
    }
    else{
      this.products.add(dataToSend).subscribe(()=>{
          this.router.navigate(['/dashboard/products'])
        this.alert.show("Product created Successfully",'success')
      })

      
    }
  }

}
