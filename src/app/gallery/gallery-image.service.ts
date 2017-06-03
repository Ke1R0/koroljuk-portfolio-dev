import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptionsArgs, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { GalleryImage } from './gallery-image.model';
import { AuthenticationService } from '../services/authentication.service';

export class GetImagesResponse {
    hasMoreItems: boolean;
    page: number;
    items: GalleryImage[];
}

@Injectable()
export class GalleryImageService {
    private picturesUrl: string = '/api/pictures';

    constructor(
        private http: Http,
        private auth: AuthenticationService) {}

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    private parseObjectToSearchParams(obj: any): URLSearchParams|null {
        if (!(obj instanceof Object)) {
            return null;
        }
        const searchParams = new URLSearchParams();
        for (let prop in obj) {
            searchParams.append(prop, obj[prop]);
        }
        return searchParams;
    }

    private buildImageUri(imageId: string): string {
        return `/api/images/${imageId}`;
    }

    private prepareImages(images: GalleryImage[]) {
        images.forEach(image => this.prepareImage(image));
    }

    private prepareImage(image: GalleryImage): GalleryImage {
        image.path = this.buildImageUri(image.imageId);
        image.previewPath = this.buildImageUri(image.previewImageId);
        return image;
    }

    getImage(imageId: string): Observable<GalleryImage> {
        return this.http.get(`${this.picturesUrl}/${imageId}`)
            .map(res => this.prepareImage(res.json() as GalleryImage));
    }

    getImages(queryParams: any): Promise<GetImagesResponse> {
        const options: RequestOptionsArgs = {
            params: this.parseObjectToSearchParams(queryParams)
            
        };
        return this.http.get(this.picturesUrl, options)
            .toPromise()
            .then(res => {
                let response = res.json() as GetImagesResponse;
                this.prepareImages(response.items);
                return response;
            }).catch(this.handleError);
    }

    updateImage(image: GalleryImage): Observable<GalleryImage> {
        let options = new RequestOptions({ headers: this.auth.Headers });
        return this.http.put(`${this.picturesUrl}/${image._id}`, image, options)
            .map(res => this.prepareImage(res.json() as GalleryImage));
    }

    uploadImage(file: File): Observable<GalleryImage> {
        let newImage = new FormData();
        newImage.append("file", file);
        newImage.append("name", file.name);
        let options = new RequestOptions({ headers: this.auth.Headers });
        return this.http.post(`${this.picturesUrl}`, newImage, options)
            .map(res => this.prepareImage(res.json()));
    }

    deleteImage(imageId: string): Observable<GalleryImage> {
        let options = new RequestOptions({ headers: this.auth.Headers });
        return this.http.delete(`${this.picturesUrl}/${imageId}`, options)
            .map(res => res.json());
    }
}