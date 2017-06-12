import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArrayUtils } from '../../utils/ig-utils';
import { GalleryImageService } from '../gallery-image.service';
import { GalleryImage } from '../gallery-image.model';
import { GalleryCategory } from '../../models/galleryCategory.model';
import { CategoryProxyService, CategoryType } from '../../services/category-proxy.service';

@Component({
  templateUrl: './gallery-image-edit.component.html'
})
export class GalleryImageEditComponent implements OnInit {
  imageId: string;
  image: GalleryImage;
  errorMessage: string;
  categories: GalleryCategory[];

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

  getCategoryTextByCode(categoryCode: string) {
    const category = this.categories.find(cat => cat.code === categoryCode);
    return category ? category.title : categoryCode;
  }

  addCategory(categoryCode: string) {
    if (categoryCode && !ArrayUtils.contains(this.image.categories, categoryCode)) {
      this.image.categories.push(categoryCode);
    }
  }

  removeCategory(categoryCode: string) {
    this.image.categories = this.image.categories.filter(cat => cat !== categoryCode);
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