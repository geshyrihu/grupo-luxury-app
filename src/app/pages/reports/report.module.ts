import { PrimengModule } from './../../shared/primeng/primeng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { RouterModule } from '@angular/router';
import { CallAdminReportComponent } from './call-admin/call-admin.component';
import { MinutaComponent } from './minuta/minuta.component';

import { OrderModule } from 'ngx-order-pipe';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PipesModule } from 'src/app/shared/helpers/pipes/pipes.module';
@NgModule({
  declarations: [ReportComponent, CallAdminReportComponent, MinutaComponent],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    ComponentsModule,
    OrderModule,
    PrimengModule,
  ],
})
export class ReportModule {}
