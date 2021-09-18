import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualMaintenanceModule } from './maintenance/manual-maintenance.module';
import { ManualsComponent } from './manuals.component';
import { RouterModule } from '@angular/router';
import { ResidentModule } from './resident/resident.module';
@NgModule({
  declarations: [ManualsComponent],
  imports: [
    CommonModule,
    ManualMaintenanceModule,
    RouterModule,
    ResidentModule,
  ],
})
export class ManualsModule {}
