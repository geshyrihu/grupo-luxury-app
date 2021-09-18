import { Routes, RouterModule } from '@angular/router';
import { PlantillaEmpleadosComponent } from './plantilla-empleados/plantilla-empleados.component';

export const RECURSOSHUMANOS_ROUTES: Routes = [
  {
    path: 'plantillaEmpleados',
    component: PlantillaEmpleadosComponent,
  },
];
