import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GalleryCategory } from '../models/galleryCategory.model'
import 'rxjs/add/operator/toPromise';

@Injectable()

export class CategoryService {
  private categoriesUrl = '/api/categories';
  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  getCategories(query: string = ""): Promise<GalleryCategory[]> {
    return this.http.get(this.categoriesUrl + `?${query}`)
      .toPromise()
      .then(res => res.json() as GalleryCategory[])
      .catch(this.handleError);
  }
}
