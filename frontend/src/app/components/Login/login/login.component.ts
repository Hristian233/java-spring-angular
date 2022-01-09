import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessage } from 'src/app/enums/alert-message.enum';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  login() {
    let username: string = this.loginForm.controls.username.value;
    let password: string = this.loginForm.controls.password.value;

    this.authService.login(username, password).subscribe(
      (res) => {
        this.authService.setAuthData(res);

        if (res['loginSuccess'] == true) {
          this.alertService.sendMessage(
            AlertMessage.loginSuccess,
            AlertType.Success
          );
        }
      },
      (err) => {
        console.log(err);

        if (err.error.loginSuccess == false) {
          this.alertService.sendMessage(err.error.message, AlertType.Error);
        }
      }
    );
  }

  private initForm() {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
