import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GalleryImage } from '../gallery-image.model';

@Component({
  selector: 'ig-image-card',
  templateUrl: './gallery-image-card.component.html',
  styleUrls: ['./gallery-image-card.component.css']
})
export class GalleryImageCardComponent {
  @Input() image: GalleryImage;
  @Input() allowEdit: boolean;
  @Input() allowDelete: boolean;
  @Output() imageClick = new EventEmitter<GalleryImage>();
  @Output() editClick = new EventEmitter<GalleryImage>();
  @Output() deleteClick = new EventEmitter<GalleryImage>();

  onImageClick(): void {
    this.imageClick.emit(this.image);
  }

  onEditClick(): void {
    this.editClick.emit(this.image);
  }

  onDeleteClick(): void {
    this.deleteClick.emit(this.image);
  }
}