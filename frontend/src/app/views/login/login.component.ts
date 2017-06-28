import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../../services/alert/alert.service';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
    //moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ]      //styling for FULL page, partials version will be
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    let msg = data.json().message;
                    if(data.json().username)
                    {
                      this.alertService.message(msg, "success", true);
                      this.router.navigate([this.returnUrl]);
                    }
                    else
                    this.alertService.message(msg, "warning");

                    this.loading = false;
                },
                error => {
                    this.alertService.message(error, "error");
                    this.loading = false;
                    console.log(error);
                });
    }
}
