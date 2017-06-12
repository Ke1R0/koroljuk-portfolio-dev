import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { ArrayUtils } from '../../utils/ig-utils';
import { GalleryImage } from '../gallery-image.model';
import { GalleryImageViewComponent } from '../gallery-image-view/gallery-image-view.component';
import { GalleryImageEditComponent } from '../gallery-image-edit/gallery-image-edit.component';
import { GalleryImageAddComponent } from '../gallery-image-add/gallery-image-add.component';
import { GalleryImageService, GetImagesResponse } from '../gallery-image.service';
import { AccessRightsService, AccessRights } from '../../services/access-rights.service';
import { PromptService, DeleteAction, CancelAction } from '../../prompt/prompt';

const FIRST_PAGE: number = 1;


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
  images: GalleryImage[] = [];
  imagesCollectionIsEmpty = false;
  hasMoreImages: boolean = true;
  filterMenuHidden: boolean = true;
  canUpload: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  private readonly itemsPerPage: number = 6;
  private pageNumber: number;
  private routeParams: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imageService: GalleryImageService,
    private accessRights: AccessRightsService,
    private modalService: NgbModal,
    private prompt: PromptService) { }

  private loadImages(params: any) {
    this.imageService.getImages(params)
      .then((data: GetImagesResponse) => {
        this.onImagesLoaded(data.items)
        this.hasMoreImages = data.hasMoreItems;
      });
  }

  private onImagesLoaded(images: GalleryImage[]) {
      Array.prototype.push.apply(this.images, images);
      this.imagesCollectionIsEmpty = ArrayUtils.isEmpty(this.images);
  }

  private removeImageFromList(imageToRemove: GalleryImage) {
    this.images = this.images.filter(image => image !== imageToRemove);
  }

  private updateImageInList(image: GalleryImage) {
    const index = this.images.findIndex((currImage) => {
      return currImage._id === image._id;
    });
    if (index >= 0) {
      this.images[index] = image;
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.routeParams = params;
      this.pageNumber = FIRST_PAGE;
      this.images = [];
      this.loadImages(params);
    });
    this.accessRights.getRights("images").subscribe((accessRights: AccessRights) => {
        this.canDelete = this.accessRights.hasDeleteRights(accessRights);
        this.canEdit = this.accessRights.hasEditRights(accessRights);
        this.canUpload = this.accessRights.hasAddRights(accessRights);
      });
  }

  trackByImages(index: number, image: GalleryImage): string {
    return image._id;
  }

  updateFilter(routeParams: any) {
    this.router.navigate(['/gallery', routeParams]);
  }

  loadNextPage() {
    this.pageNumber++;
    let params = {};
    Object.assign(params, this.routeParams, {'page': this.pageNumber});
    this.loadImages(params);
  }

  toggleFilterMenu() {
    this.filterMenuHidden = !this.filterMenuHidden;
  }

  viewImage(image: GalleryImage): void {
    let options: NgbModalOptions = {size: "lg"};
    let modalRef = this.modalService.open(GalleryImageViewComponent, options);
    modalRef.componentInstance.image = image;
  }

  editImage(image: GalleryImage): void {
    let options: NgbModalOptions = {size: "sm"};
    let modalRef = this.modalService.open(GalleryImageEditComponent, options);
    modalRef.componentInstance.imageId = image._id;
    modalRef.result.then(image => this.updateImageInList(image)).catch(() => {});
  }

  uploadImage() {
    let options: NgbModalOptions = {size: "sm"};
    let modalRef = this.modalService.open(GalleryImageAddComponent, options);
    modalRef.result.then(image => this.images.unshift(image)).catch(() => {});;
  }

  deleteImage(image: GalleryImage) {
    let delAction = new DeleteAction();
    this.prompt.show(
      'Удаление изображения',
      'Изображение будет удалено. Продолжить?',
      [delAction, new CancelAction()]
    ).then((result: any) => {
      if (result === delAction.value) {
        this.imageService.deleteImage(image._id).subscribe(
          data => this.removeImageFromList(image),
          err => { console.warn(err)}
        );
      }
    }).catch(() => {})
  }
}
