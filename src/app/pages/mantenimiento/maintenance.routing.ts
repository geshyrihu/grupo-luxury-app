import { BitacoraMantenimientoComponent } from './bitacora-mantenimiento/bitacora-mantenimiento.component';
import { Routes } from '@angular/router';

import { IndexMaintenanceOrderComponent } from './maintenance-order/index.component';
import { IndexOperationReportComponent } from './operation-reports/index.component';
import { MachineriesComponent } from './machineries/index.component';
import { MaintenanceCalendarsComponent } from './maintenance-calendars/index.component';
import { OperatingboardsComponent } from '../client/operatingboards/operatingboards.component';
import { ToolsComponent } from './tools/index.component';
import { ControlPrestamoHerramientasComponent } from './control-prestamo-herramientas/control-prestamo-herramientas.component';
import { BitacoraCuadranteComponent } from './bitacora-cuadrante/bitacora-cuadrante.component';
import { IndexBitacoraCuadranteComponent } from './bitacora-cuadrante/index-bitacora-cuadrante/index-bitacora-cuadrante.component';
import { IndexMedidorCategoriaComponent } from './medidores/medidores-categoria/index-medidor-categoria/index-medidor-categoria.component';
import { IndexMedidorComponent } from './medidores/medidores/index-medidor/index-medidor.component';
import { IndexMedidorLecturaComponent } from './medidores/medidores-lectura/index-medidor-lectura/index-medidor-lectura.component';
import { ChartLecturaComponent } from './medidores/medidores-lectura/chart-lectura/chart-lectura.component';
import { OrdenServicioInformeComponent } from './maintenance-order/orden-servicio-informe/orden-servicio-informe.component';
import { CatalogCheckListComponent } from './catalog-check-list/catalog-check-list.component';
import { CatalogInstallationComponent } from './catalog-installation/catalog-installation.component';
import { CustomerCheckListComponent } from './customer-check-list/customer-check-list.component';
import { LineTimeOperationReportComponent } from './operation-reports/line-time-operation-report/line-time-operation-report.component';
import { OperationReportComponent } from './operation-reports/operation-report/operation-report.component';
import { PendingReportComponent } from './operation-reports/pending-report/pending-report.component';
import { ReportsDeletedComponent } from './operation-reports/reports-deleted/reports-deleted.component';

export const MAINTENANCE_ROUTES: Routes = [
  { path: 'bitacoraMantenimiento', component: BitacoraMantenimientoComponent },
  { path: 'machineries', component: MachineriesComponent },
  { path: 'maintenanceCalendars', component: MaintenanceCalendarsComponent },
  { path: 'maintenanceOrders', component: IndexMaintenanceOrderComponent },
  {
    path: 'maintenanceOrdersInforme/:customerId/:monthId/:yearId',
    component: OrdenServicioInformeComponent,
  },
  { path: 'operatingboards', component: OperatingboardsComponent },
  { path: 'operationReport', component: IndexOperationReportComponent },
  { path: 'tools', component: ToolsComponent },
  {
    path: 'controlPrestamoHerramientas',
    component: ControlPrestamoHerramientasComponent,
  },
  {
    path: 'bitacoraCuadrantre',
    component: BitacoraCuadranteComponent,
  },
  {
    path: 'indexBitacoraCuadrantre/:id',
    component: IndexBitacoraCuadranteComponent,
  },
  {
    path: 'indexMedidorCategoria',
    component: IndexMedidorCategoriaComponent,
  },
  {
    path: 'indexMedidor',
    component: IndexMedidorComponent,
  },
  {
    path: 'indexMedidorLectura/:id',
    component: IndexMedidorLecturaComponent,
  },
  {
    path: 'chartLectura/:id',
    component: ChartLecturaComponent,
  },
  {
    path: 'CatalogCheckList',
    component: CatalogCheckListComponent,
  },
  {
    path: 'CatalogInstallation',
    component: CatalogInstallationComponent,
  },
  {
    path: 'CustomerCheckList',
    component: CustomerCheckListComponent,
  },
  {
    path: 'line-time-operation-report',
    component: LineTimeOperationReportComponent,
  },
  {
    path: 'operation-report',
    component: OperationReportComponent,
  },
  {
    path: 'pending-report',
    component: PendingReportComponent,
  },
  {
    path: 'reports-deleted',
    component: ReportsDeletedComponent,
  },
];
