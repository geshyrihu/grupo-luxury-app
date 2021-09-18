import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-startheader',
  templateUrl: './startheader.component.html',
})
export class StartheaderComponent {
  @Input('title') title: string;
  @Input('ToShowAddButton') ToShowAddButton: boolean;
  @Input('ToShowToReturnButton') ToShowToReturnButton: boolean;
  @Input('ToShowSaveButton') ToShowSaveButton: boolean;
  @Input('ToShowSearchInput') ToShowSearchInput: boolean;
  @Input('PathAdd') PathAdd: string;
  @Input('PathToReturn') PathToReturn: string;

  @Output() _search = new EventEmitter<string>();
  @Output() _save = new EventEmitter();
  @Output() _toReturnAction = new EventEmitter();
  constructor() {}

  searchItem(value: string) {
    this._search.emit(value);
  }
  toReturnAction() {
    this._toReturnAction.emit();
  }

  save() {
    this._save.emit();
  }
}
