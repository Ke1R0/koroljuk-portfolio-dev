import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GalleryListComponent }    from './gallery-list/gallery-list.component';

const routes: Routes = [
  { path: 'gallery',  component: GalleryListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class GalleryRoutingModule { }
