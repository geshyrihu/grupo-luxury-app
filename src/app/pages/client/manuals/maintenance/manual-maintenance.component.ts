import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance',
  templateUrl: './manual-maintenance.component.html',
})
export class ManualMaintenanceComponent {
  mostrar = true;
  ruta = '';
  constructor(private router: Router) {
    this.mostrar = true;
    this.mostrar = true;
    if (this.router.url !== '/manual/mantenimiento') {
      this.mostrar = false;
    }
  }

  ToReturnAction() {
    this.mostrar = !this.mostrar;
  }
}
