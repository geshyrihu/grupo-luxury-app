import { Routes } from '@angular/router';
import { CalculadorasComponent } from './calculadoras/calculadoras.component';

// Guard

export const UTILIDADES_ROUTES: Routes = [
  { path: 'calculadoras', component: CalculadorasComponent },
];
