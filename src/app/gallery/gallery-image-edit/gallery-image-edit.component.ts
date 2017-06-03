import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GalleryImageService } from '../gallery-image.service';
import { GalleryImage } from '../gallery-image.model';
import { GalleryCategory } from '../../models/galleryCategory.model';
import { CategoryProxyService, CategoryType } from '../../services/category-proxy.service';

@Component({
  templateUrl: './gallery-image-edit.component.html'
})
export class GalleryImageEditComponent implements OnInit {
  imageId: string;
  private image: GalleryImage;
  private errorMessage: string;
  private categories: GalleryCategory[];

  constructor(
    private modalInstance: NgbActiveModal,
    private imageService: GalleryImageService,
    private categoryService: CategoryProxyService) {
  }

  ngOnInit() {
    this.categoryService.getCategories(CategoryType.Internal)
      .then((categories: GalleryCategory[]) => {
        this.categories = categories;
      });
    this.imageService.getImage(this.imageId)
      .subscribe(
        image => this.image = image,
        err => console.warn(err)
      )
  }

  addCategory(categoryCode: string) {
    this.image.categories.push(categoryCode);
  }

  save() {
    this.imageService.updateImage(this.image)
      .subscribe(
        (image) => this.modalInstance.close(image),
        error => this.errorMessage = error
      );
  }

  cancel() {
    this.modalInstance.dismiss();
  }
}