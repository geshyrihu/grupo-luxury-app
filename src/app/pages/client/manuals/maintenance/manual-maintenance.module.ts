import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerSupportComponent } from './customerSupport/customer-support.component';
import { EquipmentComponent } from './equipamiento/equipment.component';
import { PositionComponent } from './position/position.component';
import { WorkplanComponent } from './workplan/workplan.component';
import { OrderAndCleanComponent } from './orderAndCleanliness/order-and-cleanliness.component';
import { ManualMaintenanceComponent } from './manual-maintenance.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  declarations: [
    ManualMaintenanceComponent,
    CustomerSupportComponent,
    EquipmentComponent,
    PositionComponent,
    WorkplanComponent,
    OrderAndCleanComponent,
  ],
  imports: [CommonModule, RouterModule, ComponentsModule],
  exports: [
    CustomerSupportComponent,
    EquipmentComponent,
    PositionComponent,
    WorkplanComponent,
    OrderAndCleanComponent,
    ManualMaintenanceComponent,
  ],
})
export class ManualMaintenanceModule {}
