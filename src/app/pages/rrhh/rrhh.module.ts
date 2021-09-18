import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RrhhRoutingModule } from './rrhh.routing';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { RrhhComponent } from './rrhh.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/shared/helpers/pipes/pipes.module';
import { CuestionarioAddOrEditComponent } from './cuestionario-add-or-edit/cuestionario-add-or-edit.component';
import { CuestionarioPreguntasComponent } from './cuestionario-preguntas/cuestionario-preguntas.component';
import { CuestionarioAddOrEditPreguntaComponent } from './cuestionario-add-or-edit-pregunta/cuestionario-add-or-edit-pregunta.component';
import { CuestionarioAddOrEditRespuestasComponent } from './cuestionario-add-or-edit-respuestas/cuestionario-add-or-edit-respuestas.component';
import { EvaluacionAddOrEditComponent } from './evaluacion-add-or-edit/evaluacion-add-or-edit.component';
import { MisEvaluacionesComponent } from './mis-evaluaciones/mis-evaluaciones.component';

@NgModule({
  declarations: [CuestionarioComponent, EvaluacionComponent, RrhhComponent, CuestionarioAddOrEditComponent, CuestionarioPreguntasComponent, CuestionarioAddOrEditPreguntaComponent, CuestionarioAddOrEditRespuestasComponent, EvaluacionAddOrEditComponent, MisEvaluacionesComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    PrimengModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
    RrhhRoutingModule,
  ],
})
export class RrhhModule {}
