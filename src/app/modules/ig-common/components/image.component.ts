import { Component, Input, Directive, HostListener } from '@angular/core';

@Component({
  selector: 'ig-img',
  template: `
      <img igImage #img="igImage" [src]="src" [alt]="alt" class="{{imgClass}}" [class.hidden]="!img.loaded">
      <ig-loader *ngIf="!img.loaded"></ig-loader>
  `
})
export class ImageComponent {
  @Input() imgClass: string;
  @Input() alt: string;
  @Input() src: string;
}

@Directive({
    selector: "[igImage]",
    exportAs: 'igImage'
})
export class ImageDirective {
    loaded: boolean = false;

    @HostListener('load') onLoad() {
        this.loaded = true;
    }
}