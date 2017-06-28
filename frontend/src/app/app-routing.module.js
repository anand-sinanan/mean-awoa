"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./views/dashboard/dashboard.component");
var gallery_component_1 = require("./views/gallery/gallery.component");
var register_component_1 = require("./views/register/register.component");
var login_component_1 = require("./views/login/login.component");
var index_component_1 = require("./views/user/images/index.component");
var auth_guard_1 = require("./services/auth/auth-guard");
//import { ImagesComponent }      from './images.component';
//import { ImageDetailComponent }  from './image-detail.component';
//import { CarouselComponent } from './partials/carousel/carousel.component';
var routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    //{ path: 'carousel',  component: CarouselComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    //{ path: 'images/detail/:id', component: ImageDetailComponent },
    //{ path: 'images',     component: ImagesComponent },
    { path: 'gallery', component: gallery_component_1.GalleryComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'images', component: index_component_1.IndexComponent, canActivate: [auth_guard_1.AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map