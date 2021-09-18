import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login-block-button',
  templateUrl: './login-block-button.component.html',
})
export class LoginBlockButtonComponent {
  @Input()
  name: string;
  @Input()
  showRegister: boolean;
  @Input()
  showLogin: boolean;
  @Input()
  showrecoveryPassword: boolean;
}
