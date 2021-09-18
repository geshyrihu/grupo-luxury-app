import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceComponent } from './maintenance.component';
import { AddoreditMachineriesComponent } from './machineries/addoredit.component';
import { AddoreditMaintenanceCalendarsComponent } from './maintenance-calendars/addoredit.component';
import { AddoreditOperationReportComponent } from './operation-reports/addoredit.component';
import { MachineriesComponent } from './machineries/index.component';
import { OrderServiceComponent } from './machineries/order-service.component';
import { MaintenanceCalendarsComponent } from './maintenance-calendars/index.component';
import { IndexMaintenanceOrderComponent } from './maintenance-order/index.component';
import { IndexOperationReportComponent } from './operation-reports/index.component';
import { PanelComponent } from './operation-reports/panel.component';
import { AddoreditToolsComponent } from './tools/addoredit.component';
import { ToolsComponent } from './tools/index.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/shared/helpers/pipes/pipes.module';
import { BitacoraMantenimientoComponent } from './bitacora-mantenimiento/bitacora-mantenimiento.component';
import { FormBitacoraMantenimientoComponent } from './bitacora-mantenimiento/form-bitacora-mantenimiento/form-bitacora-mantenimiento.component';
import { BitacoraIndividualComponent } from './bitacora-mantenimiento/bitacora-individual/bitacora-individual.component';
import { ControlPrestamoHerramientasComponent } from './control-prestamo-herramientas/control-prestamo-herramientas.component';
import { FormControlPrestamoHerramientaComponent } from './control-prestamo-herramientas/form-control-prestamo-herramienta/form-control-prestamo-herramienta.component';
import { BitacoraCuadranteComponent } from './bitacora-cuadrante/bitacora-cuadrante.component';
import { FormBitacoraCuadranteComponent } from './bitacora-cuadrante/form-bitacora-cuadrante/form-bitacora-cuadrante.component';
import { IndexBitacoraCuadranteComponent } from './bitacora-cuadrante/index-bitacora-cuadrante/index-bitacora-cuadrante.component';
import { AddEquiposBitacoraCuadranteComponent } from './bitacora-cuadrante/add-equipos-bitacora-cuadrante/add-equipos-bitacora-cuadrante.component';
import { FormCuadranteBitacoraMantenimientoComponent } from './bitacora-cuadrante/form-cuadrante-bitacora-mantenimiento/form-cuadrante-bitacora-mantenimiento.component';
import { IndexMedidorCategoriaComponent } from './medidores/medidores-categoria/index-medidor-categoria/index-medidor-categoria.component';
import { FormMedidorCategoriaComponent } from './medidores/medidores-categoria/form-medidor-categoria/form-medidor-categoria.component';
import { IndexMedidorComponent } from './medidores/medidores/index-medidor/index-medidor.component';
import { FormMedidorComponent } from './medidores/medidores/form-medidor/form-medidor.component';
import { IndexMedidorLecturaComponent } from './medidores/medidores-lectura/index-medidor-lectura/index-medidor-lectura.component';
import { FormMedidorLecturaComponent } from './medidores/medidores-lectura/form-medidor-lectura/form-medidor-lectura.component';
import { FormUploadImgComponent } from './maintenance-order/form-upload-img/form-upload-img.component';
import { AdminFormMedidorLecturaComponent } from './medidores/medidores-lectura/admin-form-medidor-lectura/admin-form-medidor-lectura.component';
import { ChartLecturaComponent } from './medidores/medidores-lectura/chart-lectura/chart-lectura.component';
import { OrdenServicioInformeComponent } from './maintenance-order/orden-servicio-informe/orden-servicio-informe.component';
import { CatalogInstallationComponent } from './catalog-installation/catalog-installation.component';
import { CatalogInstallationAddOrEditComponent } from './catalog-installation/catalog-installation-add-or-edit/catalog-installation-add-or-edit.component';
import { CatalogCheckListComponent } from './catalog-check-list/catalog-check-list.component';
import { CatalogCheckListAddOrEditComponent } from './catalog-check-list/catalog-check-list-add-or-edit/catalog-check-list-add-or-edit.component';
import { AddCheckListComponent } from './catalog-installation/add-check-list/add-check-list.component';
import { CustomerCheckListComponent } from './customer-check-list/customer-check-list.component';
import { CustomerCheckListAddOrEditComponent } from './customer-check-list/customer-check-list-add-or-edit/customer-check-list-add-or-edit.component';
import { LineTimeOperationReportComponent } from './operation-reports/line-time-operation-report/line-time-operation-report.component';
import { OperationReportComponent } from './operation-reports/operation-report/operation-report.component';
import { PendingReportComponent } from './operation-reports/pending-report/pending-report.component';
import { ReportsDeletedComponent } from './operation-reports/reports-deleted/reports-deleted.component';

@NgModule({
  declarations: [
    AddEquiposBitacoraCuadranteComponent,
    AddoreditMachineriesComponent,
    AddoreditMaintenanceCalendarsComponent,
    AddoreditOperationReportComponent,
    AddoreditToolsComponent,
    AdminFormMedidorLecturaComponent,
    BitacoraCuadranteComponent,
    BitacoraIndividualComponent,
    BitacoraMantenimientoComponent,
    ChartLecturaComponent,
    ControlPrestamoHerramientasComponent,
    FormBitacoraCuadranteComponent,
    FormBitacoraMantenimientoComponent,
    FormControlPrestamoHerramientaComponent,
    FormCuadranteBitacoraMantenimientoComponent,
    FormMedidorCategoriaComponent,
    FormMedidorComponent,
    FormMedidorLecturaComponent,
    FormUploadImgComponent,
    IndexBitacoraCuadranteComponent,
    IndexMaintenanceOrderComponent,
    IndexMedidorCategoriaComponent,
    IndexMedidorComponent,
    IndexMedidorLecturaComponent,
    IndexOperationReportComponent,
    MachineriesComponent,
    MaintenanceCalendarsComponent,
    MaintenanceComponent,

    OrdenServicioInformeComponent,
    OrderServiceComponent,
    PanelComponent,
    ToolsComponent,
    CatalogInstallationComponent,
    CatalogInstallationAddOrEditComponent,
    CatalogCheckListComponent,
    CatalogCheckListAddOrEditComponent,
    AddCheckListComponent,
    CustomerCheckListComponent,
    CustomerCheckListAddOrEditComponent,
    LineTimeOperationReportComponent,
    OperationReportComponent,
    PendingReportComponent,
    ReportsDeletedComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    PrimengModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
  ],
  exports: [],
})
export class MaintenanceModule {}
