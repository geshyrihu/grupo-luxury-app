import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecursosHumanosComponent } from './recursos-humanos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { RouterModule } from '@angular/router';
import { PlantillaEmpleadosComponent } from './plantilla-empleados/plantilla-empleados.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PipesModule } from 'src/app/shared/helpers/pipes/pipes.module';

@NgModule({
  declarations: [RecursosHumanosComponent, PlantillaEmpleadosComponent],
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
export class RecursosHumanosModule {}
