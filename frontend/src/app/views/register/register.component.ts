import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//confirm password - custom validator : the right way
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

//helper
import {PasswordValidation} from '../../helper/password.validation'

import { AlertService } from '../../services/alert/alert.service';
import { UserService } from '../../services/user/user.service';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: [ 'register.component.css' ]
})

export class RegisterComponent implements OnInit {
    form: FormGroup;
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private fb: FormBuilder
      ) {}

    ngOnInit(){

          this.form = this.fb.group({
            firstName: [''],
            lastName: [''],
            username: [''],
            email: [''],
            password: [''],
            cpassword: ['']
          }
          , { validator: PasswordValidation.MatchPassword  }
  )
    }

    register() {
        this.loading = true;
        console.log(this.form.value);
        this.userService.register(this.form.value)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    // (consider all BE messages to have a data.level to reduce lines here)
                    if(data.level == "success")
                    this.alertService.message(data.message, "success");
                    else if(data.path)
                    {
                    this.alertService.message(data.path + " : " + data._message,  "warning");
                    }
                    else
                    this.alertService.message(data.message,  "warning");

                    this.loading = false;
                    console.log(data);
                    //this.router.navigate(['/login']);
                },
                error => {

                    this.alertService.message(error, "error");
                    this.loading = false;
                    console.log(error);
                });
    }
}
