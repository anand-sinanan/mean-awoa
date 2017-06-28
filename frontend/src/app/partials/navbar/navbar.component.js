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
var authentication_service_1 = require("../../services/auth/authentication.service");
var NavbarComponent = (function () {
    function NavbarComponent(auth) {
        var _this = this;
        this.auth = auth;
        this.loggedIn = this.auth.isLoggedIn();
        this.loggedIn.subscribe(function (res) {
            console.log("construct: isLoggedIn is " + res);
            _this.currentUser = JSON.parse(localStorage.getItem('currentUser')); //why does this not set outside of suscribe?
            if (_this.currentUser)
                console.log(_this.currentUser.username);
            else {
                console.log(JSON.parse(localStorage.getItem('currentUser')));
            }
        });
    }
    NavbarComponent.prototype.logout = function () {
        this.auth.logout();
        console.log("Sign Out triggered (navbar)");
        // localStorage.removeItem('currentUser');
        // this.router.navigate(['/login']);
    };
    NavbarComponent.prototype.ngOnInit = function () {
        this.loggedIn.subscribe(function (res) { console.log("ngoninit: isLoggedIn is " + res); });
        if (this.currentUser)
            console.log("ngoninit" + this.currentUser.username);
        else
            console.log("ngoninit: currentUser is " + localStorage.getItem('currentUser'));
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    core_1.Component({
        selector: 'navbar',
        templateUrl: './navbar.component.html',
        styleUrls: ['./navbar.component.css'],
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map