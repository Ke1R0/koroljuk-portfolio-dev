import { Component, OnInit } from '@angular/core';
import { GalleryCategory } from '../models/galleryCategory.model';
import { CategoryProxyService } from '../services/category-proxy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  categories: GalleryCategory[];
  constructor(private categoryService: CategoryProxyService) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .then(categories => this.categories = categories);
  }
}
