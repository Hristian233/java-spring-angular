import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.less'],
})
export class SearchFormComponent implements OnInit {
  searchForm: FormGroup;
  languages = [];
  categories = [];
  universities = [];

  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      category: [''],
      author: [''],
      language: [''],
      university: [''],
    });
  }

  searchBook() {
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
      name: this.stringToLowerCase(this.searchForm.controls.name.value),
      author: this.stringToLowerCase(this.searchForm.controls.author.value),
      category: this.searchForm.controls.category.value._id
        ? this.searchForm.controls.category.value._id
        : '',
      language: this.searchForm.controls.language.value._id
        ? this.searchForm.controls.language.value._id
        : '',
      university: this.searchForm.controls.university.value._id
        ? this.searchForm.controls.university.value._id
        : '',
    };
  }

  stringToLowerCase(str: string): string {
    return str.toLowerCase();
  }

  setLanguages(languagesArray: Array<any>): void {
    languagesArray.forEach((element) => {
      this.languages.push(element);
    });
  }

  setCategories(categoriesArray: Array<any>): void {
    categoriesArray.forEach((element) => {
      this.categories.push(element);
    });
  }

  setUniveristies(unisArray: Array<any>): void {
    unisArray.forEach((element) => {
      this.universities.push(element);
    });
  }
}
