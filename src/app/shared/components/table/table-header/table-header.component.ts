import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
})
export class TableHeaderComponent implements OnInit {
  @Input()
  title: string = '';
  @Input()
  dt: any;
  @Input()
  showAdd: boolean = true;
  @Input()
  rolAuth: boolean = true;
  @Input()
  isDataView: boolean = false;

  @Input()
  showSearch: boolean = true;

  @Output() add = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onAdd(data: any) {
    this.add.emit(data);
  }
}
