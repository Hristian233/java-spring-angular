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
  carsToDisplay: CarModel[];
  carsObservable: Subscription;

  constructor(
    private carService: CarService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carsObservable = this.carService.getCars().subscribe(
      (res) => {
        this.carsToDisplay = res;
      },
      (err) => {
        this.alertService.sendMessage(
          'Грешка при зареждането на учебници!',
          AlertType.Error
        );
      }
    );
  }

  redirectToDetailView(id: string) {
    this.router.navigate(['/book_details', id]);
  }

  ngOnDestroy() {
    this.carsObservable.unsubscribe();
  }
}
