import { Component, OnInit } from '@angular/core';
import { GalleryCategory } from '../models/galleryCategory.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  categories: GalleryCategory[];
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .then(categories => this.categories = categories);
  }
}
