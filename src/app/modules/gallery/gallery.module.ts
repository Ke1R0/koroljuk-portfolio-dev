import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { IgCommonModule } from '../ig-common/ig-common.module';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryImageService } from './gallery-image.service';
import { GalleryListComponent }    from './gallery-list/gallery-list.component';
import { GalleryImageCardComponent } from './gallery-image-card/gallery-image-card.component';
import { GalleryImageEditComponent } from './gallery-image-edit/gallery-image-edit.component';
import { GalleryImageViewComponent } from './gallery-image-view/gallery-image-view.component';
import { GalleryImageAddComponent } from './gallery-image-add/gallery-image-add.component';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { IgCheckListComponent } from './check-list/check-list.component';
import { PromptService, PromptComponent } from '../../prompt/prompt';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GalleryRoutingModule,
    IgCommonModule
  ],
  declarations: [
    GalleryListComponent,
    GalleryImageCardComponent,
    GalleryImageEditComponent,
    GalleryImageViewComponent,
    GalleryImageAddComponent,
    PromptComponent,
    IgCheckListComponent,
    CategoryFilterComponent
  ],
  entryComponents: [
    GalleryImageViewComponent,
    GalleryImageEditComponent,
    GalleryImageAddComponent,
    PromptComponent
  ],
  providers: [
    GalleryImageService,
    PromptService
  ]
})

export class GalleryModule {}
