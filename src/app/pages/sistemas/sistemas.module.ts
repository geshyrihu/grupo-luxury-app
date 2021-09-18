import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemasReporteComponent } from './sistemas-reporte/sistemas-reporte.component';
import { SistemasComponent } from './sistemas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { RouterModule } from '@angular/router';
import { AddoreditSistemasReporteComponent } from './addoredit-sistemas-reporte/addoredit-sistemas-reporte.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PipesModule } from 'src/app/shared/helpers/pipes/pipes.module';

@NgModule({
  declarations: [
    SistemasReporteComponent,
    SistemasComponent,
    AddoreditSistemasReporteComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    PrimengModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
  ],
})
export class SistemasModule {}
