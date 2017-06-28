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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/add/operator/map");
var app_config_constants_1 = require("../../app-config.constants");
var AuthenticationService = (function () {
    function AuthenticationService(http, config) {
        this.http = http;
        this.config = config;
        //added for navbar detection (or anywhere really)
        // change loggedIn to a subject
        this.loggedIn = new BehaviorSubject_1.BehaviorSubject(this.hasToken());
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.loggedIn.next(!!localStorage.getItem('currentUser'));
    }
    AuthenticationService.prototype.hasToken = function () {
        return !!localStorage.getItem('currentUser');
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        console.log("auth->isLoggedIn: but is there local storage?" + this.hasToken());
        return this.loggedIn.asObservable();
    };
    AuthenticationService.prototype.login = function (username, password) {
        //return this.http.post(this.config.BE_URL+'login', { username: username, password: password }).map((response: Response) => response.json());
        var _this = this;
        return this.http.post(this.config.BE_URL + 'login', { username: username, password: password })
            .map(function (response) {
            // login  successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            if (token) {
                // set token property
                _this.token = token;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                //set flag
                _this.loggedIn.next(true);
            }
            else {
                //set flag
                _this.loggedIn.next(false);
                console.log(response.json());
            }
            return response;
        });
    };
    AuthenticationService.prototype.logout = function () {
        //logout on server side (is this really necessary? would clearing localStorage on frontend be good enough)
        this.http.get(this.config.BE_URL + 'logout')
            .map(function (response) {
            if (response.json().message == "Log out successful") {
                //handle logout from backend stuff here
            }
        });
        // clear token remove user from local storage to log user out
        //(regardless of backend status? sure why not)
        this.token = null;
        localStorage.removeItem('currentUser');
        this.loggedIn.next(false);
        console.log("Sign Out triggered (auth)");
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject(app_config_constants_1.APP_CONFIG)),
    __metadata("design:paramtypes", [http_1.Http, Object])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map