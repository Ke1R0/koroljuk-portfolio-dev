import { Component, Input, Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export interface Action {
  text: string;
  value: any;
}

export class DeleteAction implements Action {
  text = 'Удалить';
  value = 'DELETE';
}

export class CancelAction implements Action {
  text = 'Отменить';
  value = 'CANCEL';
}

@Component({
  selector: 'ig-prompt',
  templateUrl: 'prompt.component.html'
})
export class PromptComponent {
  @Input() title: string;
  @Input() text: string;
  @Input() actions: Action[];

  constructor(private modalInstance: NgbActiveModal) {
  }

  onActionClick(value: any) {
    this.modalInstance.close(value);
  }
}

@Injectable()
export class PromptService {
  constructor(private modalService: NgbModal) {}

  show(title: string, text: string, actions?: Action[]) {
    const modalRef = this.modalService.open(PromptComponent);
    const componentInstance = modalRef.componentInstance
    componentInstance.title = title;
    componentInstance.text = text;
    componentInstance.actions = actions;
    return modalRef.result;
  }
}