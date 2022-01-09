import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { CarModel } from 'src/app/models/car.model';
import { AlertService } from 'src/app/services/alert.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.less'],
})
export class CarComponent implements OnInit, OnDestroy {
  languageListenerStub: Subscription;
  carForm: FormGroup;
  languages = [];
  categories = [];
  universities = [];
  images = [];
  fileSelected = null;
  imageUploadMessage: string = '';
  fileObj: File;
  imageUrls: Array<any> = [];
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private http: HttpClient,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.carForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: [''],
    });
  }

  ngOnDestroy() {}

  addCar() {
    this.carService.addNewCar(this.carForm.value).subscribe(
      (res) => {
        this.alertService.sendMessage(res.message, AlertType.Success);
        this.carForm.reset();
        this.images = [];
      },
      (err) => {
        this.alertService.sendMessage(err.error.message, AlertType.Error);
      }
    );

    window.scrollTo(0, 0);
  }

  mapDataToBookObject(): any {
    return {
      name: this.carForm.controls.name.value,
      description: this.carForm.controls.description.value,
      price: this.carForm.controls.price.value,
      image: this.carForm.controls.image.value,
    };
  }
}
