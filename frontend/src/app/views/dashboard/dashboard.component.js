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
var image_service_1 = require("../../services/image/image.service");
var DashboardComponent = (function () {
    function DashboardComponent(imageService) {
        this.imageService = imageService;
        this.myInterval = 5000;
        this.noWrapSlides = false;
        this.active = 0;
        this.currIndex = 0;
        this.master = 'Parent';
    }
    DashboardComponent.prototype.getImages = function () {
        var _this = this;
        this.imageService.getImages().then(function (images) { return _this.images = images; });
    };
    DashboardComponent.prototype.ngOnInit = function () {
        this.getImages();
        // for (var i = 0; i < 4; i++) {
        //   this.addSlide();
        // }
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'my-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: [
            './dashboard.component.css',
        ],
    }),
    __metadata("design:paramtypes", [image_service_1.ImageService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map