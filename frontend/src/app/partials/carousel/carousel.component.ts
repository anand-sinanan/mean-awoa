import { Component, Input, OnInit } from '@angular/core';

import { Image } from '../../collections/image/image';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: [ './full-carousel.component.css' ],

})

export class CarouselComponent implements OnInit {

  @Input() images: Image[];
  @Input('master') masterName: string;
    myInterval = 5000;
    noWrapSlides = false;
    active = 0;
    //imagesl : Image[];
    currIndex = 0;
    master : string = 'Not the Parent';

    constructor(
    //  private imageService: ImageService,

    ) {}


    getImages(): void {
         //this.imagesl = images

    }

    ngOnInit(): void {
      //this.getImages();
      //this.master = masterName;


    }
  }
