import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less'],
})
export class AlertComponent implements OnInit {
  showSuccess: boolean = false;
  showError: boolean = false;
  showLoginError: boolean = false;
  message: string = '';

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.onAlert().subscribe(async (res) => {
      this.hideErrorMessages();
      this.message = res.message;
      this.showProperErrorMessage(res.alertType);

      await setTimeout(() => {
        this.hideErrorMessages();
      }, 4000);
    });
  }

  private hideErrorMessages(): void {
    this.showSuccess = false;
    this.showError = false;
    this.showLoginError = false;
  }

  private showProperErrorMessage(alertType: AlertType): void {
    switch (alertType) {
      case 0:
        this.showSuccess = true;
        break;
      case 1:
        this.showError = true;
        break;
    }
  }
}
