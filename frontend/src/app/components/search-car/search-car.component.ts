import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.less'],
})
export class SearchCarComponent implements OnInit {
  carForm: FormGroup;
  languages = [];
  categories = [];
  universities = [];

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carForm = this.createForm();
    this.carService.searchResults = [];
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
    });
  }

  searchCar() {
    let book = this.createSearchObject();

    this.carService.searchCar(book).subscribe(
      (res) => {
        this.carService.searchResults = res.results;
        this.router.navigate(['/search_results']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createSearchObject(): Object {
    return {
      name: this.stringToLowerCase(this.carForm.controls.name.value),
    };
  }

  stringToLowerCase(str: string): string {
    return str.toLowerCase();
  }
}
