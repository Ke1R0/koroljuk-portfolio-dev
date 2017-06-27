import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GalleryCategory } from '../models/galleryCategory.model'
import 'rxjs/add/operator/toPromise';

export enum CategoryType {
  External,
  Internal
}

@Injectable()
export class CategoryService {
  private categoriesUrl = '/api/categories';
  private categoryTypeQuery = {
    [CategoryType.External]: "external=true",
    [CategoryType.Internal]: "external=false"
  }

  constructor(private http: Http) { }

  private getQueryByType(type: CategoryType): string {
    return this.categoryTypeQuery[type] || "";
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  getCategories(type?: CategoryType): Promise<GalleryCategory[]> {
    const query = this.getQueryByType(type) || '';
    return this.http.get(this.categoriesUrl + `?${query}`)
      .toPromise()
      .then(res => res.json() as GalleryCategory[])
      .catch(this.handleError);
  }
}
