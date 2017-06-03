import { Component, Input } from '@angular/core';

@Component({
  selector: 'ig-flat-button',
  template: '<a href="#" class="card-link" (click)="$event.preventDefault();">{{text}}</a>'
})
export class FlatButton {
  @Input() text: string;
}