import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type alertType = "success" | "error"

export interface Alert{
  type:alertType,
  message:string
}

@Injectable({providedIn: 'root'})

export class AlertsService {
  private alertSubject = new BehaviorSubject<Alert | null>(null);

  alert = this.alertSubject.asObservable();

  show(message: string,type:alertType) {
    this.alertSubject.next({type,message});
    setTimeout(() => {
      this.alertSubject.next(null);
    }, 3000);
  }
}
