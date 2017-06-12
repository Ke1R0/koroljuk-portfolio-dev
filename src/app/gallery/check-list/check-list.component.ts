import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ig-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class IgCheckListComponent {
  @Input() items: IgCheckListItem[];
  @Output() checkedChange = new EventEmitter<void>();

  private onCheckedChange() {
    this.checkedChange.emit();
  }

  private setChecked(items: IgCheckListItem[], checked: boolean) {
    items.forEach(item => { item.checked = checked });
  }

  itemClick(item: IgCheckListItem) {
    item.checked = !item.checked;
    this.onCheckedChange();
  }

  selectAll() {
    this.setChecked(this.items, true);
    this.onCheckedChange();
  }

  deselectAll() {
    this.setChecked(this.items, false);
    this.onCheckedChange();
  }
}

export interface IgCheckListItem {
    text: string;
    value: any;
    checked: boolean;
}