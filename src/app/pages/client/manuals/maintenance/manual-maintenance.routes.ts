import { Routes } from '@angular/router';

import { PositionComponent } from './position/position.component';
import { OrderAndCleanComponent } from './orderAndCleanliness/order-and-cleanliness.component';
import { WorkplanComponent } from './workplan/workplan.component';
import { EquipmentComponent } from './equipamiento/equipment.component';
import { CustomerSupportComponent } from './customerSupport/customer-support.component';

export const MANUAL_MAINTENANCE_ROUTES: Routes = [
  { path: 'position', component: PositionComponent },
  { path: 'orderandcleanliness', component: OrderAndCleanComponent },
  { path: 'workplan', component: WorkplanComponent },
  { path: 'equipment', component: EquipmentComponent },
  { path: 'customersupport', component: CustomerSupportComponent },
];
