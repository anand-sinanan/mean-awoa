"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { Router, CanActivate } from '@angular/router';
var authentication_service_1 = require("./authentication.service");
var router_1 = require("@angular/router");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var AuthGuard = (function () {
    function AuthGuard(router, auth) {
        this.router = router;
        this.auth = auth;
    }
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
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        var authenticated = this.auth.isLoggedIn();
        var subject = new BehaviorSubject_1.BehaviorSubject(null);
        //idea here was to make canActivate trigger on logout for every route referencing it
        //might have to think of other ways, define other types of guards to handle
        //being logged out differently depending on where you are
        //Eventually authenticated user should redirect to Dashboard/Gallery by default, once user
        //dashboard and image / user specific management gets built, for now redirect to
        //login (perhaps have modal on logout for user to choose where they want to go : dash/gallery/login/reg)
        authenticated.subscribe(function (res) {
            console.log("onNext guard: " + res + ", state url : " + state.url);
            if (!res && (state.url === '/images')) {
                console.log("redirecting to gallery");
                state.url = '/gallery';
                _this.router.navigate([state.url]);
            }
            subject.next(res);
        });
        return subject.asObservable();
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        authentication_service_1.AuthenticationService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth-guard.js.map