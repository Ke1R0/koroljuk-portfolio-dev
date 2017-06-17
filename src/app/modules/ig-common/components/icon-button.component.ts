import { Component, Input } from '@angular/core';

@Component({
  selector: 'ig-icon-button',
  template: '<i class="icon-button rounded fa {{icon}}" title={{title}}></i>',
  styles: [`
    .icon-button {
      margin: 1px 3px;
      font-size: 30px;
      padding: 5px;
      cursor: pointer;
      border: black solid 1px;
    }
    .icon-button:hover {
      box-shadow: 0 0 2px 1px #55C594;
      color: #55C594;
      background-color: #fafafa;
      border: transparent solid 1px;
    }
    .icon-button:active {
      box-shadow: 0 0;
    }
  `]
})
export class IconButton {
  @Input() icon: string;
  @Input() title: string;
}