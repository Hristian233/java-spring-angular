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

    this.authService.createUser(this.registerForm.value).subscribe(
      (res) => {
        this.alertService.sendMessage(
          AlertMessage.registerSuccess,
          AlertType.Success
        );

        this.router.navigate(['/login']);
      },
      (err) => {
        this.alertService.sendMessage(err.message, AlertType.Error);
      }
    );
  }

  private initForm() {
    return this.formBuilder.group({
      username: [''],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }
}
