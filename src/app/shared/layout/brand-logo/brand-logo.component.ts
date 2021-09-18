import { environment } from './../../../../environments/environment';
import { Component } from '@angular/core';

@Component({
  selector: 'app-brand-logo',
  templateUrl: './brand-logo.component.html',
  styles: [],
})
export class BrandLogoComponent {
  baseUrl: string;
  constructor() {
    this.baseUrl = environment.base_urlImg;
  }
}
