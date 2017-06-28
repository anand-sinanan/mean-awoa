import { Component, OnInit } from '@angular/core';

import { Image } from '../../collections/image/image';
import { ImageService } from '../../services/image/image.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
    //'./partials/carousel/full-carousel.component.css'
   ],

})

export class DashboardComponent implements OnInit {

  myInterval = 5000;
  noWrapSlides = false;
  active = 0;
  images : Image[];
  currIndex = 0;
  master : string = 'Parent';

  constructor(
    private imageService: ImageService,

  ) {}


  getImages(): void {
      this.imageService.getImages().then(
        images => this.images = images
      );
  }

  ngOnInit(): void {
    this.getImages();


      // for (var i = 0; i < 4; i++) {
      //   this.addSlide();
      // }
  }

  // toggleState(hero: Hero) {
  // hero.state = (hero.state === 'active' ? 'inactive' : 'active');
  // }
  // onSelect(hero: Hero): void {
  //     this.selectedHero = hero;
  // }
  // gotoDetail(): void {
  //     this.router.navigate(['/detail', this.selectedHero.id]);
  // }
  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.heroService.create(name)
  //     .then(hero => {
  //       this.heroes.push(hero);
  //       this.selectedHero = null;
  //     });
  // }
  // delete(hero: Hero): void {
  //   this.heroService
  //       .delete(hero.id)
  //       .then(() => {
  //         this.heroes = this.heroes.filter(h => h !== hero);
  //         if (this.selectedHero === hero) { this.selectedHero = null; }
  //       });
  // }


  // addSlide = function() {
  //   var newWidth = 600 + this.slides.length + 1;
  //   this.images.push({
  //     image: '//unsplash.it/' + newWidth + '/300',
  //     text: ['Nice image','Awesome photograph','That is so cool','I love that'][this.slides.length % 4],
  //     id: this.currIndex++
  //   });
  // };
  //
  // randomize = function() {
  //   var indexes = generateIndexesArray();
  //   this.assignNewIndexesToSlides(indexes);
  // };
  //
  //
  //
  // // Randomize logic below
  //
  // assignNewIndexesToSlides = function (indexes) {
  //   for (var i = 0, l = this.images.length; i < l; i++) {
  //     this.images[i].id = indexes.pop();
  //   }
  // }
  //
  // function generateIndexesArray() {
  //   var indexes = [];
  //   for (var i = 0; i < currIndex; ++i) {
  //     indexes[i] = i;
  //   }
  //   return shuffle(indexes);
  // }
  //
  // // http://stackoverflow.com/questions/962802#962890
  // function shuffle(array) {
  //   var tmp, current, top = array.length;
  //
  //   if (top) {
  //     while (--top) {
  //       current = Math.floor(Math.random() * (top + 1));
  //       tmp = array[current];
  //       array[current] = array[top];
  //       array[top] = tmp;
  //     }
  //   }
  //
  //   return array;
  // }
}
