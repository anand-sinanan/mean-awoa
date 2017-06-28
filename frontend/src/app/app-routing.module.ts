import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './views/dashboard/dashboard.component';
import { GalleryComponent }   from './views/gallery/gallery.component';
import { RegisterComponent }   from './views/register/register.component';
import { LoginComponent }   from './views/login/login.component';
import { IndexComponent }   from './views/user/images/index.component';

import { AuthGuard } from './services/auth/auth-guard';
//import { ImagesComponent }      from './images.component';
//import { ImageDetailComponent }  from './image-detail.component';

//import { CarouselComponent } from './partials/carousel/carousel.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{ path: 'carousel',  component: CarouselComponent },
  { path: 'dashboard',  component: DashboardComponent },
  //{ path: 'images/detail/:id', component: ImageDetailComponent },
  //{ path: 'images',     component: ImagesComponent },
  { path: 'gallery',    component: GalleryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'images', component: IndexComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
