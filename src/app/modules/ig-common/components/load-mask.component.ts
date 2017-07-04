import { Component, OnInit } from '@angular/core';
import { LoadMaskService } from '../services/load-mask.service';

@Component({
  selector: 'ig-load-mask',
  template: '<div *ngIf="visible" class="load-mask"><ig-loader></ig-loader></div>',
  styleUrls: ['./load-mask.component.css']
})
export class LoadMaskComponent implements OnInit {
  visible: boolean = false;
  constructor(private loadMaskService: LoadMaskService) {}

  ngOnInit() {
    this.loadMaskService.$maskVisibilityChanged.subscribe(visible => this.visible = visible);
  }
}