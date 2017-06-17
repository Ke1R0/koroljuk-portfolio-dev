import { Component } from '@angular/core';

@Component({
  selector: 'ig-loader',
  template: `
    <div class="loader">
      <div class="loader-item loader-item-1"></div>
      <div class="loader-item loader-item-2"></div>
      <div class="loader-item loader-item-3"></div>
      <div class="loader-item loader-item-4"></div>
      <div class="loader-item loader-item-5"></div>
    </div>
  `,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
}