import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class LoadMaskService {
  private maskVisible = new Subject<boolean>();

  $maskVisibilityChanged = this.maskVisible.asObservable();

  showMask(): void {
    this.maskVisible.next(true);
  }

  hideMask(): void {
    this.maskVisible.next(false);
  }
}
