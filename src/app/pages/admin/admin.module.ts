import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';

// Modulos
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { RolesComponent } from './roles/roles.component';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { SliderCustomerComponent } from './slider-customer/slider-customer.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpleadosEditComponent } from './empleados-edit/empleados-edit.component';
import { HistorialAccesoComponent } from './historial-acceso/historial-acceso.component';

@NgModule({
  declarations: [AdminComponent, RolesComponent, SliderCustomerComponent, EmpleadosComponent, EmpleadosEditComponent, HistorialAccesoComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ComponentsModule,
    FormsModule,
    PrimengModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  exports: [AdminComponent, RolesComponent],
})
export class AdminModule {}
