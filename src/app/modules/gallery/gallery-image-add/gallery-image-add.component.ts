import { Component } from "@angular/core";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GalleryImageService } from '../gallery-image.service';
import { GalleryImage } from '../gallery-image.model';

@Component({
  templateUrl: './gallery-image-add.component.html'
})
export class GalleryImageAddComponent {
  image: GalleryImage;
  file: File;
  errorMessage: string;

  constructor(
    private modalInstance: NgbActiveModal,
    private imageService: GalleryImageService) {
  }

  onFileChange(files: FileList) {
    this.errorMessage = '';
    this.file = files ? files[0] : null;
  }

  save() {
    if (!this.file) {
      return;
    }
    this.imageService.uploadImage(this.file).subscribe((image: GalleryImage) => {
      this.modalInstance.close(image);
    }, err => this.errorMessage = err);
  }

  cancel() {
    this.modalInstance.dismiss();
  }
}