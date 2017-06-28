import { Component, Input, OnInit } from '@angular/core';

import { Image } from '../../collections/image/image';

@Component({
  selector: 'thumb',
  templateUrl: './thumb.component.html',
  styleUrls: [ './thumb.component.css' ],

})

export class ThumbComponent implements OnInit {

  @Input() images: Image[];

    constructor(
    //  private imageService: ImageService,

    ) {}

    ngOnInit(): void {
    }
  }
