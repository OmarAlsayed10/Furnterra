import { Component, OnInit } from '@angular/core';
import { AlertsService,Alert} from './alerts.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styles: []
})
export class AlertComponent implements OnInit {

alert$!:Observable<Alert|null>

  
  constructor(private alertService: AlertsService) {}


  ngOnInit(): void {

    this.alert$ = this.alertService.alert;
  }
}
