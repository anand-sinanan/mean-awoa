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
var alert_service_1 = require("../../services/alert/alert.service");
var animations_1 = require("@angular/animations");
var AlertComponent = (function () {
    // ngOnChanges() {
    //    this.visibility = this.isVisible ? 'shown' : 'hidden';
    //    console.log("ngOnchanges visibility is" + this.visibility);
    // }
    function AlertComponent(alertService) {
        this.alertService = alertService;
        this.isVisible = true;
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.visibility= 'hidden';
        this.alertService.getMessage().subscribe(function (message) {
            _this.message = message;
            //because to clear alert is a matter of subject.next() in alert.service.ts, this should ensure
            //always going from void -> shown. Would've been easier to do a proper 'show'/'hidden' animation
            //if all that was being done was showing and hiding the alert rather than replacing with empty message
            //Seems messy, maybe i should leave the div content and have close just hide message
            _this.visibility = 'shown';
        });
    };
    AlertComponent.prototype.closeAlert = function (event) {
        //this.visibility = 'hidden';
        console.group("Done animating");
        console.log("From:", event.fromState);
        console.log("To:", event.toState);
        console.log("Actual State:", this.visibility);
        console.groupEnd();
        // If the animation was allowed to complete fully, then the event.toState should
        // match the actual state of the trigger (and the event.totalTime should be
        // accurate). HOWEVER, if the current transition was interrupted, and the "done"
        // event is just a byproduct of that premature finish, then the event.toState
        // will NOT MATCH the current state (and the event.totalTime will not be accurate).
        //if ( ( this.visibility !== "none" ) && ( this.visibility === event.toState ) ) {
        //this.thingState = "none";
        //}
        //ensure subject.next() is called at the END of going from "shown" => *
        if ((event.fromState == "shown")) {
            this.alertService.closeAlert();
            //this.visibility = 'hidden';
        }
    };
    return AlertComponent;
}());
AlertComponent = __decorate([
    core_1.Component({
        //moduleId: module.id,
        selector: 'alert',
        templateUrl: './alert.component.html',
        animations: [
            // trigger('heroState', [
            //   state('inactive', style({
            //     backgroundColor: '#eee',
            //     transform: 'scale(1)'
            //   })),
            //   state('active',   style({
            //     backgroundColor: '#cfd8dc',
            //     transform: 'scale(1.1)'
            //   })),
            //   transition('inactive => active', animate('100ms ease-in')),
            //   transition('active => inactive', animate('100ms ease-out'))
            // ]),
            //   trigger('shrinkOut', [
            //   state('out', style({height: '*'})),
            //   transition('* => void', [
            //     style({height: '*'}),
            //     animate(250, style({height: 0}))
            //   ])
            // ]),
            //     trigger('flyInOut', [
            //     state('in', style({width: 120, transform: 'translateX(0)', opacity: 1})),
            //     transition('void => *', [
            //       style({width: 10, transform: 'translateX(50px)', opacity: 0}),
            //       group([
            //         animate('0.3s 0.1s ease', style({
            //           transform: 'translateX(0)',
            //           width: 120
            //         })),
            //         animate('0.3s ease', style({
            //           opacity: 1
            //         }))
            //       ])
            //     ]),
            //     transition('* => void', [
            //       group([
            //         animate('0.3s ease', style({
            //           transform: 'translateX(50px)',
            //           width: 10
            //         })),
            //         animate('0.3s 0.2s ease', style({
            //           opacity: 0
            //         }))
            //       ])
            //     ])
            //   ])
            animations_1.trigger('visibilityChanged', [
                animations_1.state('shown', animations_1.style({ opacity: 0.8 })),
                animations_1.state('void', animations_1.style({ opacity: 0 })),
                //transition('shown => *', animate('.5s')),
                animations_1.transition('* => *', animations_1.animate('.5s'))
            ])
        ]
    }),
    __metadata("design:paramtypes", [alert_service_1.AlertService])
], AlertComponent);
exports.AlertComponent = AlertComponent;
//# sourceMappingURL=alert.component.js.map