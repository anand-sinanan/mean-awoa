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
var router_1 = require("@angular/router");
var image_service_1 = require("../../services/image/image.service");
var GalleryComponent = (function () {
    function GalleryComponent(imageService, router) {
        this.imageService = imageService;
        this.router = router;
    }
    GalleryComponent.prototype.getImages = function () {
        var _this = this;
        this.imageService.getImages().then(function (images) { return _this.images = images; });
    };
    GalleryComponent.prototype.ngOnInit = function () {
        this.getImages();
    };
    GalleryComponent.prototype.toggleState = function (image) {
        image.state = (image.state === 'active' ? 'inactive' : 'active');
    };
    GalleryComponent.prototype.onSelect = function (image) {
        this.selectedImage = image;
    };
    GalleryComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedImage.id]);
    };
    GalleryComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.imageService.create(name)
            .then(function (image) {
            _this.images.push(image);
            _this.selectedImage = null;
        });
    };
    GalleryComponent.prototype.delete = function (image) {
        var _this = this;
        this.imageService
            .delete(image.id)
            .then(function () {
            _this.images = _this.images.filter(function (i) { return i !== image; });
            if (_this.selectedImage === image) {
                _this.selectedImage = null;
            }
        });
    };
    return GalleryComponent;
}());
GalleryComponent = __decorate([
    core_1.Component({
        selector: 'gallery',
        templateUrl: './gallery.component.html',
        styleUrls: [
            './gallery.component.css',
            '../../../partials/thumb/thumb.component.css'
        ],
        providers: [
            image_service_1.ImageService,
        ],
    }),
    __metadata("design:paramtypes", [image_service_1.ImageService,
        router_1.Router])
], GalleryComponent);
exports.GalleryComponent = GalleryComponent;
//# sourceMappingURL=gallery.component.js.map