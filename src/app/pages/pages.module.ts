import { InventarioModule } from './inventario/inventario.module';
import { MaintenanceModule } from './mantenimiento/maintenance.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { layoutModule } from '../shared/layout/layout.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../shared/components/components.module';

// Components
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { AdminModule } from './admin/admin.module';
import { ComunesModule } from './comunes/comunes.module';
import { ClientModule } from './client/client.module';
import { ShoppingModule } from './shopping/shopping.module';
import { UtilidadesModule } from './utilidades/utilidades.module';

import { PrimengModule } from '../shared/primeng/primeng.module';
import { RecursosHumanosModule } from './recursos-humanos/recursos-humanos.module';
import { BrowserModule } from '@angular/platform-browser';
import { DCardTitleComponent } from './dashboard/d-card-title/d-card-title.component';
import { SistemasModule } from './sistemas/sistemas.module';
import { PipesModule } from '../shared/helpers/pipes/pipes.module';
import { DashboardOrdenServicioComponent } from './dashboard/item-dashboard/dashboard-orden-servicio/dashboard-orden-servicio.component';
import { SupervisionModule } from './supervision/supervision.module';
import { RrhhModule } from './rrhh/rrhh.module';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    DCardTitleComponent,
    DashboardOrdenServicioComponent,
  ],
  imports: [
    CommonModule,
    layoutModule,
    RouterModule,
    FormsModule,
    InventarioModule,
    ReactiveFormsModule,
    ComponentsModule,
    AdminModule,
    ClientModule,
    PrimengModule,
    MaintenanceModule,
    ShoppingModule,
    ComunesModule,
    UtilidadesModule,
    RecursosHumanosModule,
    BrowserModule,
    PipesModule,
    SistemasModule,
    SupervisionModule,
    RrhhModule,
  ],
  exports: [PagesComponent, DashboardComponent],
})
export class PagesModule {}
