import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GalleryImage } from '../gallery-image.model';

@Component({
  templateUrl: "./gallery-image-view.component.html"
})
export class GalleryImageViewComponent {
  @Input() image: GalleryImage;

  constructor(private modalInstance: NgbActiveModal) {
  }

  dismiss() {
    this.modalInstance.dismiss();
  }
}