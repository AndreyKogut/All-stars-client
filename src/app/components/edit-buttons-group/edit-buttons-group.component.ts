import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-buttons-group',
  templateUrl: './edit-buttons-group.component.html',
  styleUrls: ['./edit-buttons-group.component.less']
})
export class EditButtonsGroupComponent {
  @Input() isVisible: Boolean = false;
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();

  handleOnSubmit() {
    this.onSubmit.emit();
  }

  handleOnCancel() {
    this.onCancel.emit();
  }
}

