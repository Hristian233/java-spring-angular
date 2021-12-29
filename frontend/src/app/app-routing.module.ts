import { ProfilePageComponent } from './components/Profile Page/profile-page/profile-page.component';
import { CarRequestsComponent } from './components/car-requests/car-requests.component';
import { IsSignedInGuard } from './gruads/is-signed-in.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/Login/login/login.component';
import { RegisterComponent } from './components/Register/register/register.component';
import { CarComponent } from './components/add-car/add-car.component';
import { AuthGuard } from './gruads/auth.guard';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { HomePageComponent } from './components/Home Page/home-page/home-page.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { PageNotFoundComponent } from './components/Page Not Found/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent, canActivate: [IsSignedInGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'add_car', component: CarComponent, canActivate: [AuthGuard] },
  { path: 'search_book', component: SearchCarComponent },
  { path: 'search_results', component: SearchResultComponent },
  { path: 'book_details/:id', component: CarDetailsComponent },
  {
    path: 'book_requests',
    component: CarRequestsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
