import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { CarModel } from 'src/app/models/car.model';
import { AlertService } from 'src/app/services/alert.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  carsToDisplay: boolean;
  carsObservable: Subscription;

  constructor(
    private carService: CarService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carsObservable = this.carService.getCars().subscribe(
      (res: any) => {
        this.carService.searchResults = res;
        this.carsToDisplay = true;
      },
      (err) => {
        this.alertService.sendMessage(
          'Грешка при зареждането на обяви!',
          AlertType.Error
        );
      }
    );
  }

  redirectToDetailView(id: string) {
    this.router.navigate([`/cars/details/${id}`]);
  }

  ngOnDestroy() {
    this.carsObservable.unsubscribe();
  }
}
