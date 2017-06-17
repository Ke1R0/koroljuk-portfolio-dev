import { NgModule }       from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { CommonModule }   from '@angular/common';

import { LoaderComponent } from './components/loader.component';
import { LoadMaskComponent } from './components/load-mask.component';
import { IconButton } from './components/icon-button.component';
import { FlatButton } from './components/flat-button.component';
import { ImageComponent, ImageDirective } from './components/image.component';
import { LoadMaskService } from './services/load-mask.service';
import { IgHttpService, IgHttpServiceFactory } from './services/ig-http.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    LoaderComponent,
    LoadMaskComponent,
    IconButton,
    FlatButton,
    ImageComponent,
    ImageDirective
  ],
  exports: [
    LoaderComponent,
    LoadMaskComponent,
    IconButton,
    FlatButton,
    ImageComponent,
    ImageDirective
  ],
  providers: [
    LoadMaskService, {
      provide: Http,
      useFactory: IgHttpServiceFactory,
      deps: [XHRBackend, RequestOptions, LoadMaskService]
    }
  ]
})

export class IgCommonModule {}
