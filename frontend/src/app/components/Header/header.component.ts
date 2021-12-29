import { CarService } from 'src/app/services/car.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { AlertMessage } from 'src/app/enums/alert-message.enum';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { isNumber, isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerStub: Subscription;
  isUserAuthenticated: boolean = false;
  userName: string;
  notificationsCount: number = 0;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private carService: CarService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.userName = localStorage.getItem('userName')
      ? localStorage.getItem('userName')
      : 'Потребител';
    this.authListenerStub = this.authService
      .getAuthStatusListener()
      .subscribe((obj) => {
        this.isUserAuthenticated = obj.isAuthenticated;
        this.userName = obj.userName;
        // this.getNotificationsCount();
        this.cdRef.detectChanges();
      });
  }

  logout() {
    this.authService.logout();
    this.alertService.sendMessage(
      AlertMessage.logoutSuccess,
      AlertType.Success
    );
  }

  ngOnDestroy(): void {
    this.authListenerStub.unsubscribe();
  }
}
