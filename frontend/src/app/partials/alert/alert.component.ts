import { Component, OnInit } from '@angular/core';

import { AlertService } from '../../services/alert/alert.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  group
} from '@angular/animations';

@Component({
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
  trigger('visibilityChanged', [
      state('shown' , style({ opacity: 0.8 })),
      state('void', style({ opacity: 0 })),
      //transition('shown => *', animate('.5s')),
      transition('* => *', animate('.5s'))
    ])
    ]
})

export class AlertComponent {
    message: any;
    isVisible : boolean = true;
    visibility: string;

  // ngOnChanges() {
  //    this.visibility = this.isVisible ? 'shown' : 'hidden';
  //    console.log("ngOnchanges visibility is" + this.visibility);
  // }
    constructor(private alertService: AlertService) { }

    ngOnInit() {
        //this.visibility= 'hidden';
        this.alertService.getMessage().subscribe(message => {
          this.message = message;

          //because to clear alert is a matter of subject.next() in alert.service.ts, this should ensure
          //always going from void -> shown. Would've been easier to do a proper 'show'/'hidden' animation
          //if all that was being done was showing and hiding the alert rather than replacing with empty message

          //Seems messy, maybe i should leave the div content and have close just hide message
          this.visibility= 'shown';
        });


    }
    closeAlert(event:any){
      //this.visibility = 'hidden';
      console.group( "Done animating" );
       console.log( "From:", event.fromState );
       console.log( "To:", event.toState );
       console.log( "Actual State:", this.visibility );
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
      if( (event.fromState=="shown") )
      {
      this.alertService.closeAlert();
      //this.visibility = 'hidden';
      }
    }
}
