import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Image } from '../../collections/image/image';
import { ImageService } from '../../services/image/image.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  group
} from '@angular/animations';

@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: [
      './gallery.component.css',
      '../../../partials/thumb/thumb.component.css'
    ],
    providers: [
        ImageService,
    ],
    // animations: [
    //   trigger('heroState', [
    //     state('inactive', style({
    //       backgroundColor: '#eee',
    //       transform: 'scale(1)'
    //     })),
    //     state('active',   style({
    //       backgroundColor: '#cfd8dc',
    //       transform: 'scale(1.1)'
    //     })),
    //     transition('inactive => active', animate('100ms ease-in')),
    //     transition('active => inactive', animate('100ms ease-out'))
    //   ]),
    //   trigger('flyInOut', [
    //   state('in', style({width: 120, transform: 'translateX(0)', opacity: 1})),
    //   transition('void => *', [
    //     style({width: 10, transform: 'translateX(50px)', opacity: 0}),
    //     group([
    //       animate('0.3s 0.1s ease', style({
    //         transform: 'translateX(0)',
    //         width: 120
    //       })),
    //       animate('0.3s ease', style({
    //         opacity: 1
    //       }))
    //     ])
    //   ]),
    //   transition('* => void', [
    //     group([
    //       animate('0.3s ease', style({
    //         transform: 'translateX(50px)',
    //         width: 10
    //       })),
    //       animate('0.3s 0.2s ease', style({
    //         opacity: 0
    //       }))
    //     ])
    //   ])
    // ])
    // ]

})

export class GalleryComponent implements OnInit {
    images: Image[];
    selectedImage: Image;

    constructor(
      private imageService: ImageService,
      private router: Router
    ) { }

    getImages(): void {
        this.imageService.getImages().then(
          images => this.images = images
        );
    }

    ngOnInit(): void {
      this.getImages();
    }

    toggleState(image: Image) {
    image.state = (image.state === 'active' ? 'inactive' : 'active');
  }
    onSelect(image: Image): void {
        this.selectedImage = image;
    }
    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedImage.id]);
    }
    add(name: string): void {
      name = name.trim();
      if (!name) { return; }
      this.imageService.create(name)
        .then(image => {
          this.images.push(image);
          this.selectedImage = null;
        });
    }
    delete(image: Image): void {
      this.imageService
          .delete(image.id)
          .then(() => {
            this.images = this.images.filter(i => i !== image);
            if (this.selectedImage === image) { this.selectedImage = null; }
          });
    }

}
