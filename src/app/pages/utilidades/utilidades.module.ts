import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculadorasComponent } from './calculadoras/calculadoras.component';
import { UtilidadesComponent } from './utilidades.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManualsModule } from '../client/manuals/manuals.module';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { RouterModule } from '@angular/router';
import { LeyohmComponent } from './calculadoras/leyohm/leyohm.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PipesModule } from 'src/app/shared/helpers/pipes/pipes.module';

@NgModule({
  declarations: [CalculadorasComponent, UtilidadesComponent, LeyohmComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ManualsModule,
    PipesModule,
    PrimengModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class UtilidadesModule {}
