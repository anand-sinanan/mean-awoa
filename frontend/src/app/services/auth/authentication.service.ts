import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map'

import { APP_CONFIG } from '../../app-config.constants'
import { AppConfig } from '../../app-config.interface';

@Injectable()
export class AuthenticationService {
    public token: string;

    //added for navbar detection (or anywhere really)
    // change loggedIn to a subject
   loggedIn = new BehaviorSubject<boolean>(this.hasToken());

   private hasToken() : boolean {
    return !!localStorage.getItem('currentUser');
  }

  isLoggedIn() : Observable<boolean> {
    console.log("auth->isLoggedIn: but is there local storage?" + this.hasToken());
   return this.loggedIn.asObservable();
 }

    constructor
    (
      private http: Http,
      @Inject(APP_CONFIG) private config: AppConfig
    ) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.loggedIn.next(!!localStorage.getItem('currentUser'));
    }

    login(username: string, password: string): Observable<Response> {

//return this.http.post(this.config.BE_URL+'login', { username: username, password: password }).map((response: Response) => response.json());

        return this.http.post(this.config.BE_URL+'login', { username: username, password: password })
            .map((response: Response) => {
                // login  successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    //set flag
                    this.loggedIn.next(true);


                } else {

                    //set flag
                    this.loggedIn.next(false);
                    console.log(response.json());

                }
                return response;
            });
    }

    logout(): void {
      //logout on server side (is this really necessary? would clearing localStorage on frontend be good enough)
     this.http.get(this.config.BE_URL+'logout')
          .map((response: Response) => {
              if(response.json().message == "Log out successful")
              {
                  //handle logout from backend stuff here

              }

          });

          // clear token remove user from local storage to log user out
          //(regardless of backend status? sure why not)
          this.token = null;
          localStorage.removeItem('currentUser');
          this.loggedIn.next(false);
          console.log("Sign Out triggered (auth)");


    }
}
