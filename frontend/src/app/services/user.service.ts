import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseEndpoint = this.environment.apiUrl;

  constructor(private http: HttpClient, @Inject('env') private environment) {}

  getUserData(userId: string): Observable<any> {
    return this.http.get(
      `${this.baseEndpoint}/api/users/single_user/${userId}`
    );
  }
}
