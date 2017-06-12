import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ArrayUtils, RouteUtils } from '../../utils/ig-utils';
import { GalleryCategory } from '../../models/galleryCategory.model';
import { CategoryProxyService, CategoryType } from '../../services/category-proxy.service';
import { IgCheckListItem } from '../check-list/check-list.component';

@Component({
  selector: 'ig-category-filter',
  template: `<ig-check-list (checkedChange)="updateFilters()" [items]="categoryFilterItems"></ig-check-list>`
})
export class CategoryFilterComponent implements OnInit {
  categoryFilterItems: IgCheckListItem[];
  private activeFilter: Params;

  @Output() filterChanged = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryProxyService) {}

  private isCategoryChecked(category: GalleryCategory): boolean {
    return ArrayUtils.contains(this.activeFilter.categories, category.code);
  }

  private initCategoryFilterItems(categories: GalleryCategory[]) {
    this.categoryFilterItems = categories.map(category => {
      const filterItem: IgCheckListItem = {
        checked: this.isCategoryChecked(category),
        text: category.title,
        value: category
      };
      return filterItem;
    });
  }

  private initFilter() {
    this.route.params.subscribe((params: Params) => {
      this.activeFilter = RouteUtils.splitParamValue(params);
    });
  }

  ngOnInit() {
    this.initFilter();
    this.categoryService.getCategories(CategoryType.Internal)
      .then(categories => this.initCategoryFilterItems(categories));
  }

  updateFilters() {
    let params: string[] = this.categoryFilterItems
      .filter((filterItem) => { return filterItem.checked; })
      .map((filterItem) => { return filterItem.value.code; });
    let filterParams: any = {};
    if (!ArrayUtils.isEmpty(params)) {
      filterParams.categories = params;
    }
    this.filterChanged.emit(filterParams);
  }
}