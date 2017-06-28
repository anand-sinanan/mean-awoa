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
//confirm password - custom validator : the right way
var forms_1 = require("@angular/forms");
//helper
var password_validation_1 = require("../../helper/password.validation");
var alert_service_1 = require("../../services/alert/alert.service");
var user_service_1 = require("../../services/user/user.service");
var RegisterComponent = (function () {
    function RegisterComponent(router, userService, alertService, fb) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.fb = fb;
        this.model = {};
        this.loading = false;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            firstName: [''],
            lastName: [''],
            username: [''],
            email: [''],
            password: [''],
            cpassword: ['']
        }, { validator: password_validation_1.PasswordValidation.MatchPassword });
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.loading = true;
        console.log(this.form.value);
        this.userService.register(this.form.value)
            .subscribe(function (data) {
            // set success message and pass true paramater to persist the message after redirecting to the login page
            // (consider all BE messages to have a data.level to reduce lines here)
            if (data.level == "success")
                _this.alertService.message(data.message, "success");
            else if (data.path) {
                _this.alertService.message(data.path + " : " + data._message, "warning");
            }
            else
                _this.alertService.message(data.message, "warning");
            _this.loading = false;
            console.log(data);
            //this.router.navigate(['/login']);
        }, function (error) {
            _this.alertService.message(error, "error");
            _this.loading = false;
            console.log(error);
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'register.component.html',
        styleUrls: ['register.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        user_service_1.UserService,
        alert_service_1.AlertService,
        forms_1.FormBuilder])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map