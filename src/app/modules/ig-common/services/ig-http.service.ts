import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, ConnectionBackend, XHRBackend, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

import { LoadMaskService } from './load-mask.service';

@Injectable()
export class IgHttpService extends Http {

  constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions, private loadMask: LoadMaskService) {
    super(_backend, _defaultOptions);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.loadMask.showMask();
    return super.post(url, body, options)
      .finally(() => this.loadMask.hideMask());
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.loadMask.showMask();
    return super.put(url, body, options)
      .finally(() => this.loadMask.hideMask());
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.loadMask.showMask();
    return super.delete(url, options)
      .finally(() => this.loadMask.hideMask());
  }
}

export function IgHttpServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions, loadMask: LoadMaskService) {
  return new IgHttpService(backend, defaultOptions, loadMask);
}
