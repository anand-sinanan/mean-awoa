import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../../collections/user/user';

import { APP_CONFIG } from '../../app-config.constants'
import { AppConfig } from '../../app-config.interface';

@Injectable()
export class UserService {
    constructor(
      private http: Http,
      @Inject(APP_CONFIG) private config: AppConfig
    ) { console.log( this.config.BE_URL )}

    getAll() {
        return this.http.get(this.config.BE_URL+'users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.config.BE_URL+'users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(this.config.BE_URL+'users', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put(this.config.BE_URL+'users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.config.BE_URL+'users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    register(user: User) {
        return this.http.post(this.config.BE_URL+'register', user, this.jwt()).map((response: Response) => response.json());
    }
    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
