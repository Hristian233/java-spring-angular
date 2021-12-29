import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AlertType } from '../enums/alert-type.enum';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<any>();

  // enable subscribing to alerts observable
  onAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  sendMessage(message: string, alertType: AlertType) {
    this.alert({ message, alertType: alertType });
  }

  // main alert method
  alert(alert: any) {
    this.subject.next(alert);
  }
}
