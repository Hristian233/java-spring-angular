import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { AlertMessage } from '../../../enums/alert-message.enum';
import { AlertType } from '../../../enums/alert-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.initForm();
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService
      .createUser(
        this.registerForm.controls.name.value,
        this.registerForm.controls.lastName.value,
        this.registerForm.controls.email.value,
        this.registerForm.controls.phone.value,
        this.registerForm.controls.password.value,
        this.registerForm.controls.repeatPassword.value
      )
      .subscribe(
        (res) => {
          this.alertService.sendMessage(
            AlertMessage.registerSuccess,
            AlertType.Success
          );

          this.router.navigate(['/login']);
        },
        (err) => {
          this.alertService.sendMessage(err.error.err, AlertType.Error);
        }
      );
  }

  private initForm() {
    return this.formBuilder.group({
      name: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
