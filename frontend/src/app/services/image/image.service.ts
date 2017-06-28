import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Image } from '../../collections/image/image';
import { APP_CONFIG } from '../../app-config.constants'
import { AppConfig } from '../../app-config.interface';
//import {HEROES} from './mock-heroes';

@Injectable()
export class ImageService {
    //    getHeroes(): Promise<Hero[]> {
    //      return Promise.resolve(HEROES);
    //     }
    //
    //  getHero(id: number): Promise<Hero> {
    //   return this.getHeroes()
    //              .then(heroes => heroes.find(hero => hero.id === id));
    // }
    //private imagesUrl = 'api/images';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
      private http: Http,
      @Inject(APP_CONFIG) private config: AppConfig
    ) { }

    getImages(): Promise<Image[]> {
        return this.http.get(this.config.BE_URL+'images')
            .toPromise()
            .then(response => response.json().data as Image[])
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    getImage(id: number): Promise<Image> {
      const url = `${this.config.BE_URL}images/${id}`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Image)
        .catch(this.handleError);
    }

    update(image: Image): Promise<Image> {
      const url = `${this.config.BE_URL}images/${image.id}`;
      return this.http
        .put(url, JSON.stringify(image), {headers: this.headers})
        .toPromise()
        .then(() => image)
        .catch(this.handleError);
    }
    create(name: string): Promise<Image> {
      return this.http
        .post(this.config.BE_URL, JSON.stringify({name: name}), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as Image)
        .catch(this.handleError);
    }
    delete(id: number): Promise<void> {
      const url = `${this.config.BE_URL}images/${id}`;
      return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

}
