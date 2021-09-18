import { SliderCustomerComponent } from './slider-customer/slider-customer.component';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AccountsComponent } from './accounts/accounts.component';
import { RolesComponent } from './roles/roles.component';

// Rutas
import { ACCOUNTS_ROUTES } from './accounts/accounts.routing';
import { EmpleadosComponent } from './empleados/empleados.component';
import { HistorialAccesoComponent } from './historial-acceso/historial-acceso.component';
export const ADMIN_ROUTES: Routes = [
  { path: 'accounts', component: AccountsComponent, children: ACCOUNTS_ROUTES },
  { path: 'roles', component: RolesComponent },
  { path: 'sliderCustomer', component: SliderCustomerComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'historial-acceso', component: HistorialAccesoComponent },
];
@NgModule({
  imports: [],
})
export class AdminRoutingModule {}
