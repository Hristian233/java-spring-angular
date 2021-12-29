import { CarService } from 'src/app/services/car.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-car-requests',
  templateUrl: './car-requests.component.html',
  styleUrls: ['./car-requests.component.less'],
})
export class CarRequestsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
