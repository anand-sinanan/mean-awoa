import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    // success(message: string, keepAfterNavigationChange = false) {
    //     this.keepAfterNavigationChange = keepAfterNavigationChange;
    //     this.subject.next({ type: 'success', text: message });
    // }
    //
    // info(message: string, keepAfterNavigationChange = false) {
    //     this.keepAfterNavigationChange = keepAfterNavigationChange;
    //     this.subject.next({ type: 'info', text: message });
    // }
    //
    // warning(message: string, keepAfterNavigationChange = false) {
    //     this.keepAfterNavigationChange = keepAfterNavigationChange;
    //     this.subject.next({ type: 'warning', text: message });
    // }
    //
    // error(message: string, keepAfterNavigationChange = false) {
    //     this.keepAfterNavigationChange = keepAfterNavigationChange;
    //     this.subject.next({ type: 'error', text: message });
    // }

    //after extending error and success example to include info and warning realised this was way easier
    //only downside is the ease of use right off the bat but ... minor
    message(message: string, type: string, keepAfterNavigationChange = false) {
      this.keepAfterNavigationChange = keepAfterNavigationChange;
      this.subject.next({ type: type, text: message });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    closeAlert()
    {
        //regardless of whether Bootstrap 'X' to close/hide is good enough, this ensures alert cleared.
        this.subject.next();
        console.log("Close Alert triggered.");
    }
}
