import { Injectable } from '@angular/core';
import { CategoryService } from './category.service';
import { GalleryCategory } from '../models/galleryCategory.model'

class GalleryCategoryResult {
  key: string;
  result: Promise<GalleryCategory[]>;
}

export enum CategoryType {
  External,
  Internal
}

@Injectable()
export class CategoryProxyService {
  private getCategoriesResult: GalleryCategoryResult[] = [];
  private categoryTypeQuery = {
    [CategoryType.External]: "external=true",
    [CategoryType.Internal]: "external=false"
  }

  constructor(private categoryService: CategoryService) { }

  private getQueryByType(type: CategoryType): string {
    return this.categoryTypeQuery[type] || "";
  }

  getCategories(type?: CategoryType): Promise<GalleryCategory[]> {
    let query = this.getQueryByType(type);
    if (!this.getCategoriesResult[query]) {
        this.getCategoriesResult[query] = this.categoryService.getCategories(query);
    }
    return this.getCategoriesResult[query];
  }
}
