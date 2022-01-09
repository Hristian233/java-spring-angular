import { AlertType } from 'src/app/enums/alert-type.enum';
import { AlertService } from 'src/app/services/alert.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CarModel } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.less'],
})
export class CarDetailsComponent implements OnInit {
  carToDisplay: CarModel;
  submitForm: FormGroup;
  isAuthenticated: boolean;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.submitForm = this.createForm();
    this.isAuthenticated = this.authService.getIsAuth();

    this.carService.getCarById(id.toString()).subscribe(
      (res) => {
        this.carToDisplay = res;
      },
      (err) => {
        this.alertService.sendMessage(err.error.message, AlertType.Error);
        this.router.navigate(['/']);
        console.log(err);
      }
    );
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      info: [''],
    });
  }

  sendBookRequest() {
    // this.carService.createNewRequest(bookObject).subscribe(
    //   (res) => {
    //     this.alertService.sendMessage(res.message, AlertType.Success);
    //     this.router.navigate(['/']);
    //   },
    //   (err) => {
    //     this.alertService.sendMessage(err.error.message, AlertType.Error);
    //   }
    // );

    this.modalService.dismissAll();
  }

  // openBuyModal(content) {
  //   this.modalService.open(content, { centered: true, size: 'lg' });
  // }

  ngOnDestroy() {}
}
