import { Injectable } from '@angular/core';
//import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
      private router: Router,
      private auth: AuthenticationService
    ) { }

    // canActivate() {
    //     // localStorage way
    //     // if (localStorage.getItem('currentUser')) {
    //     //     // logged in so return true
    //     //     return true;
    //     // }
    //     if(this.auth.loggedIn.getValue()){
    //       return true;
    //     }
    //
    //     // not logged in so redirect to login page
    //     this.router.navigate(['/login']);
    //     return false;
    // }
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
    var authenticated = this.auth.isLoggedIn();
    var subject = new BehaviorSubject<boolean>(null);

    //idea here was to make canActivate trigger on logout for every route referencing it
    //might have to think of other ways, define other types of guards to handle
    //being logged out differently depending on where you are

    //Eventually authenticated user should redirect to Dashboard/Gallery by default, once user
    //dashboard and image / user specific management gets built, for now redirect to
    //login (perhaps have modal on logout for user to choose where they want to go : dash/gallery/login/reg)
    authenticated.subscribe(
        (res) => {
          console.log("onNext guard: "+res+", state url : "+state.url);
          if(!res && (state.url === '/images')) {              //need to import allowable routes here for ! in public routes check
            console.log("redirecting to gallery")
            state.url = '/gallery';
            this.router.navigate([state.url]);

          }
          subject.next(res);
        });
    return subject.asObservable();
  }
}
