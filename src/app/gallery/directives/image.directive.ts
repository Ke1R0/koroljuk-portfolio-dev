import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: "[igImage]",
    exportAs: 'igImage',
})
export class ImageDirective {
    loaded: boolean = false;

    @HostListener('load') onLoad() {
        this.loaded = true;
    }
}