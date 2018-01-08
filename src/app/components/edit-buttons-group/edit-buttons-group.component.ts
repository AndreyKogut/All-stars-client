import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-buttons-group',
  templateUrl: './edit-buttons-group.component.html',
  styleUrls: ['./edit-buttons-group.component.less']
})
export class EditButtonsGroupComponent {
  @Input('isVisible') isVisible: Boolean = false;
  @Output('onSubmit') onSubmit = new EventEmitter<any>();
  @Output('onCancel') onCancel = new EventEmitter<any>();

  handleOnSubmit() {
    this.onSubmit.emit();
  }

  handleOnCancel() {
    this.onCancel.emit();
  }
}

