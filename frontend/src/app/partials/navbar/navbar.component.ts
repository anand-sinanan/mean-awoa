import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/auth/authentication.service';
import { User } from '../../collections/user/user';
import { UserService } from '../../services/user/user.service';



@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ],

})

export class NavbarComponent implements OnInit {

  // public isCollapsed: boolean;
  //
  // constructor() {
  //     this.isCollapsed = true;
  // }
  //
  // public collapse(event: any): void {
  //     console.log(event);
  // }

  currentUser: any;
  //users: User[] = [];
  loggedIn : any;

  constructor(private auth: AuthenticationService) {
    this.loggedIn = this.auth.isLoggedIn();


    this.loggedIn.subscribe((res: any) => {
      console.log("construct: isLoggedIn is " + res);
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')); //why does this not set outside of suscribe?
      if(this.currentUser)
      console.log(this.currentUser.username);
      else
      {

        console.log(JSON.parse(localStorage.getItem('currentUser')));
      }
    });

  }

  logout() {
    this.auth.logout();
    console.log("Sign Out triggered (navbar)");
    // localStorage.removeItem('currentUser');
    // this.router.navigate(['/login']);
  }


  ngOnInit(): void {

    this.loggedIn.subscribe((res: any) => {console.log("ngoninit: isLoggedIn is " + res)});
    if(this.currentUser)
    console.log("ngoninit"+ this.currentUser.username);
    else
    console.log("ngoninit: currentUser is "+ localStorage.getItem('currentUser'));
  }
}
