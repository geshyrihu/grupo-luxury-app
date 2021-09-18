import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
})
export class InputTextComponent implements OnInit {
  @Input()
  label: string = '';
  @Input()
  placeholder: string = '';
  @Input()
  formControlName: any;
  constructor() {}

  ngOnInit(): void {}
}
