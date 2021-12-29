import { AuthData } from '../models/auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginData } from '../models/login-data.model';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<any>();
  private decodedJWT: any;
  private baseEndpoint = this.environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('env') private environment
  ) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return true; // fix later
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(email: string, password: string) {
    const authData: LoginData = { email, password };

    return this.http.post<{ token: string }>(
      `${this.baseEndpoint}/api/users/login`,
      authData
    );
  }

  setAuthData(res: any) {
    const token = res.token;
    this.token = token;
    this.decodedJWT = this.decodeJWT(this.token);
    const expiresInDuration = res['expiresIn'];
    this.setAuthTimer(expiresInDuration);
    this.isAuthenticated = true;
    this.authStatusListener.next({
      isAuthenticated: true,
      userName: this.decodedJWT.userName,
    });
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
    this.saveAuthData(token, expirationDate);
    this.router.navigate(['/']);
  }

  decodeJWT(jwt: string): Object {
    return jwt_decode(jwt);
  }

  createUser(
    name: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    passwordRepeat: string
  ): Observable<any> {
    const authData: AuthData = {
      name,
      lastName,
      email,
      phone,
      password,
      passwordRepeat,
    };
    return this.http.post(`${this.baseEndpoint}/api/users/register`, authData);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next({ isAuthenticated: false, userName: '' });
    clearTimeout(this.tokenTimer);
    this.clearAuthdata();
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next({
        isAuthenticated: true,
        userName: localStorage.getItem('userName'),
      });
    }
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const exparationDate = localStorage.getItem('expiration');
    if (!token || !exparationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(exparationDate),
    };
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private clearAuthdata() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userName', this.decodedJWT.userName);
    localStorage.setItem('userId', this.decodedJWT.userId);
  }
}
