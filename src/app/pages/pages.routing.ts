import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Guard
// import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';

import { ADMIN_ROUTES } from './admin/admin.routing';
import { CLIENT_ROUTES } from './client/client.routing';
import { MANUALS_ROUTES } from './client/manuals/manuals.routing';
import { SHOPPING_ROUTES } from './shopping/shopping.routing';
import { ManualsComponent } from './client/manuals/manuals.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ComunesComponent } from './comunes/comunes.component';
import { COMUNES_ROUTES } from './comunes/comunes-routing.module';
import { MAINTENANCE_ROUTES } from './mantenimiento/maintenance.routing';
import { MaintenanceComponent } from './mantenimiento/maintenance.component';
import { INVENTARIO_ROUTES } from './inventario/inventario..routing';
import { InventarioComponent } from './inventario/inventario.component';
import { UtilidadesComponent } from './utilidades/utilidades.component';
import { UTILIDADES_ROUTES } from './utilidades/utilidades.routing';
import { RecursosHumanosComponent } from './recursos-humanos/recursos-humanos.component';
import { RECURSOSHUMANOS_ROUTES } from './recursos-humanos/recursos-humanos.routing';
import { SISTEMAS_ROUTES } from './sistemas/sistemas..routing';
import { SistemasReporteComponent } from './sistemas/sistemas-reporte/sistemas-reporte.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { SupervisionComponent } from './supervision/supervision.component';
import { SUPERVISION_ROUTES } from './supervision/supervision.routing';
import { RRHH_ROUTES } from './rrhh/rrhh.routing';
import { RrhhComponent } from './rrhh/rrhh.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'admin',
        component: AdminComponent,
        children: ADMIN_ROUTES,
        canActivate: [AuthGuard],
      },
      {
        path: 'client',
        component: ClientComponent,
        children: CLIENT_ROUTES,
        canActivate: [AuthGuard],
      },
      {
        path: 'common',
        component: ComunesComponent,
        children: COMUNES_ROUTES,
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'maintenance',
        component: MaintenanceComponent,
        children: MAINTENANCE_ROUTES,
        canActivate: [AuthGuard],
      },
      {
        path: 'manual',
        component: ManualsComponent,
        children: MANUALS_ROUTES,
        canActivate: [AuthGuard],
      },
      {
        path: 'shopping',
        component: ShoppingComponent,
        children: SHOPPING_ROUTES,
        canActivate: [AuthGuard],
      },
      {
        path: 'inventario',
        component: InventarioComponent,
        children: INVENTARIO_ROUTES,
        canActivate: [AuthGuard],
      },
      {
        path: 'utilidades',
        component: UtilidadesComponent,
        children: UTILIDADES_ROUTES,
        canActivate: [AuthGuard],
      },
      {
        path: 'recursosHumanos',
        component: RecursosHumanosComponent,
        children: RECURSOSHUMANOS_ROUTES,
        canActivate: [AuthGuard],
      },
      {
        path: 'sistemas',
        component: SistemasReporteComponent,
        children: SISTEMAS_ROUTES,
        canActivate: [AuthGuard],
      },
      {
        path: 'supervision',
        component: SupervisionComponent,
        children: SUPERVISION_ROUTES,
        canActivate: [AuthGuard],
      },
      {
        path: 'rrhh',
        component: RrhhComponent,
        children: RRHH_ROUTES,
        canActivate: [AuthGuard],
      },

      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
