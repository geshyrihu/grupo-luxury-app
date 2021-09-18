import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-footer',
  templateUrl: './table-footer.component.html',
})
export class TableFooterComponent implements OnInit {
  @Input()
  data: any[] = [];
  constructor() {}

  ngOnInit(): void {}
}
