import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { CuestionarioPreguntasComponent } from './cuestionario-preguntas/cuestionario-preguntas.component';
import { MisEvaluacionesComponent } from './mis-evaluaciones/mis-evaluaciones.component';

export const RRHH_ROUTES: Routes = [
  { path: 'cuestionarios', component: CuestionarioComponent },
  {
    path: 'evaluacion',
    component: EvaluacionComponent,
  },
  {
    path: 'cuestionario/:id',
    component: CuestionarioPreguntasComponent,
  },
  {
    path: 'mis-evaluaciones',
    component: MisEvaluacionesComponent,
  },
];
@NgModule({})
export class RrhhRoutingModule {}
