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
require("rxjs/add/operator/toPromise");
var app_config_constants_1 = require("../../app-config.constants");
//import {HEROES} from './mock-heroes';
var ImageService = (function () {
    function ImageService(http, config) {
        this.http = http;
        this.config = config;
        //    getHeroes(): Promise<Hero[]> {
        //      return Promise.resolve(HEROES);
        //     }
        //
        //  getHero(id: number): Promise<Hero> {
        //   return this.getHeroes()
        //              .then(heroes => heroes.find(hero => hero.id === id));
        // }
        //private imagesUrl = 'api/images';  // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    ImageService.prototype.getImages = function () {
        return this.http.get(this.config.BE_URL + 'images')
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    ImageService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ImageService.prototype.getImage = function (id) {
        var url = this.config.BE_URL + "images/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    ImageService.prototype.update = function (image) {
        var url = this.config.BE_URL + "images/" + image.id;
        return this.http
            .put(url, JSON.stringify(image), { headers: this.headers })
            .toPromise()
            .then(function () { return image; })
            .catch(this.handleError);
    };
    ImageService.prototype.create = function (name) {
        return this.http
            .post(this.config.BE_URL, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    ImageService.prototype.delete = function (id) {
        var url = this.config.BE_URL + "images/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    return ImageService;
}());
ImageService = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject(app_config_constants_1.APP_CONFIG)),
    __metadata("design:paramtypes", [http_1.Http, Object])
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map