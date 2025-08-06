import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Order } from './create-order.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly API = `${environment.apiURL}/orders`

  constructor(private storage:StorageService , private http:HttpClient) {}

  createOrder(order:Order){
    return this.http.post(`${this.API}`,order,{

      

    })

  }

  markAsPaid(orderId:string){
    return this.http.patch(`${this.API}/${orderId}/pay`,{},{
            
    })
  }

  getAllOrders():Observable<Order[]>{
    return this.http.get<Order[]>(`${this.API}`,{
            
    })
  }
}
