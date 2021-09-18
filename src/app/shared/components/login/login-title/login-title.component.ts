import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-title',
  templateUrl: './login-title.component.html',
  styles: [],
})
export class LoginTilteComponent {
  @Input()
  title: string = '';
  @Input()
  colorHeader: string = '';

  @Output()
  colorBorder: EventEmitter<string> = new EventEmitter<string>();
}
