import { Routes } from '@angular/router';
import { ManualMaintenanceComponent } from './maintenance/manual-maintenance.component';
import { ResidentComponent } from './resident/resident.component';
import { MANUAL_MAINTENANCE_ROUTES } from './maintenance/manual-maintenance.routes';
import { RESIDENT_ROUTES } from './resident/resident.routes';
export const MANUALS_ROUTES: Routes = [
  {
    path: 'mantenimiento',
    component: ManualMaintenanceComponent,
    children: MANUAL_MAINTENANCE_ROUTES,
  },
  {
    path: 'residente',
    component: ResidentComponent,
    children: RESIDENT_ROUTES,
  },
  {
    path: 'asistente',
    component: ResidentComponent,
    children: RESIDENT_ROUTES,
  },
];
