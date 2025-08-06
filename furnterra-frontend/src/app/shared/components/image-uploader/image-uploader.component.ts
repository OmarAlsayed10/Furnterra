import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { AlertsService } from '../alert/alerts.service';
import imageCompression from 'browser-image-compression';


@Component({
  selector: 'app-image-uploader',
  imports: [CommonModule],
  templateUrl: './image-uploader.component.html',
  styles: ``
})
export class ImageUploaderComponent {
  @Input() uploadType:'products'|'blogs'|'users' = 'products'
  @Output() imagesChanged = new EventEmitter<string[]>();
  uploadImages:string[]=[]

  API = `${environment.apiURL}`

  constructor(private http:HttpClient,private alert:AlertsService){}

  async onFileSelect(event:Event){
    const files = (event.target as HTMLInputElement).files
    if(!files || files.length === 0) return

    const uploads:Promise<any>[]=[]

    for (let i = 0 ; i < files.length ; i++){
      const file = files[i]

      if(file.size > 1 * 1024 * 1024){
        this.alert.show(`File ${file.name} is too large max size is 1MB`,'error')
        continue;
      }

      const compressedImage = await imageCompression(file,{
        maxSizeMB:0.5,
        maxWidthOrHeight:1024,
        useWebWorker:true
      })

      const formData = new FormData()
      formData.append('image',compressedImage,file.name)

      uploads.push(
        this.http.post<{imageUrl:string}>(`${this.API}/upload/${this.uploadType}`,formData)
        .toPromise()
        .then((res:any)=>{
          const url = `${this.API}${res.imageUrl.startsWith('/') ? '' : '/'}${res.imageUrl.replace('./', '')}`;

          this.uploadImages.push(url)
        })
      )
    }
   
    Promise.all(uploads).then(()=>{
      this.imagesChanged.emit(this.uploadImages)
    })
  }

  removeImage(index:number){
    this.uploadImages.splice(index,1)
    this.imagesChanged.emit(this.uploadImages)
  }
}
