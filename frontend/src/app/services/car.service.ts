import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarModel } from '../models/car.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarService {
  private baseEndpoint = this.environment.apiUrl;
  searchResults: [];

  constructor(private http: HttpClient, @Inject('env') private environment) {}

  getCarById(id: any): Observable<any> {
    return this.http.get<CarModel[]>(
      `${this.baseEndpoint}/api/car/find_by_id/` + id
    );
  }

  getCars(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(`${this.baseEndpoint}/cars/all`);
  }

  addNewCar(car: CarModel): Observable<any> {
    return this.http.post(`${this.baseEndpoint}/cars/create`, car);
  }

  searchCar(car: any): Observable<any> {
    return this.http.get(`${this.baseEndpoint}/api/car/find_by_search_query`, {
      params: car,
    });
  }
}
