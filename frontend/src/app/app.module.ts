import { IsSignedInGuard } from './gruads/is-signed-in.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { HeaderComponent } from './components/Header/header.component';
import { FooterComponent } from './components/Footer/footer.component';
import { LoginComponent } from './components/Login/login/login.component';
import { RegisterComponent } from './components/Register/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarComponent } from './components/add-car/add-car.component';
import { AlertComponent } from './components/Alert/alert/alert.component';
import { AuthGuard } from './gruads/auth.guard';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { HomePageComponent } from './components/Home Page/home-page/home-page.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarRequestsComponent } from './components/car-requests/car-requests.component';
import { environment } from '../environments/environment';
import { DecimalPipe } from '@angular/common';
import { ProfilePageComponent } from './components/Profile Page/profile-page/profile-page.component';
import { HomePageCarouselComponent } from './components/Home Page Carousel/home-page-carousel/home-page-carousel.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { HomePageSliderComponent } from './components/Home Page Slider/home-page-slider/home-page-slider.component';
import { PageNotFoundComponent } from './components/Page Not Found/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CarComponent,
    AlertComponent,
    SearchCarComponent,
    HomePageComponent,
    SearchResultComponent,
    CarDetailsComponent,
    CarRequestsComponent,
    ProfilePageComponent,
    HomePageCarouselComponent,
    SearchFormComponent,
    HomePageSliderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    IsSignedInGuard,

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: 'env', // you can also use InjectionToken
      useValue: environment,
    },
    DecimalPipe,
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
