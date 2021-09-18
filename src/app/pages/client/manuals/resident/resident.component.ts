import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styles: [],
})
export class ResidentComponent {
  mostrar = true;
  ruta = '';
  constructor(private router: Router) {
    if (this.router.url !== '/manuals/resident') {
      this.mostrar = false;
    }
  }

  ToReturnAction() {
    this.mostrar = !this.mostrar;
  }
}
