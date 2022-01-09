import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.less'],
})
export class SearchResultComponent implements OnInit {
  dataToDisplay = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.setDisplayData(this.carService.searchResults);
  }

  setDisplayData(arr) {
    if (arr) {
      this.dataToDisplay = arr;
    }
  }

  redirectToDetailView(id: string) {
    this.router.navigate([`/cars/details/${id}`]);
  }
}
