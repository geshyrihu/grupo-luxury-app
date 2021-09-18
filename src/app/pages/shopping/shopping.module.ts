import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { ShoppingComponent } from './shopping.component';

// ... Componentes
// ... Catalogo de cuentas
import { IndexChartOfAccountComponent } from './catalogoCuentas/index.component';
import { AddoreditChartOfAccountComponent } from './catalogoCuentas/addoredit.component';
import { IndexBudgetCardComponent } from './cedulaPresupuestal/index.component';
import { AddoreditBudgetCardComponent } from './cedulaPresupuestal/addoredit.component';
// import { PipesModule } from 'src/app/shared/helpers/pipes/pipes.module';
import { AddBudgetCardDetailsComponent } from './cedulaPresupuestalDetalle/add.component';
import { IndexBudgetCardDetailsComponent } from './cedulaPresupuestalDetalle/index.component';
import { PaymentMethodComponent } from './metodoDePago/payment-method.component';
import { WayToPayComponent } from './formaDePago/way-to-pay.component';
import { UseCfdiComponent } from './usoCfdi/use-cfdi.component';
import { AddoreditPaymentMethodComponent } from './metodoDePago/addoredit.component';
import { AddoreditUseCFDIComponent } from './usoCfdi/addoredit.component';
import { AddoreditWayToPayComponent } from './formaDePago/addoredit-way-to-pay.component';
import { PurchaseRequestComponent } from './solicitudCompra/index-solicitud-compra.component';
import { AddProductoComponent } from './solicitudCompra/add-producto.component';
import { SolicitudCompraComponent } from './solicitudCompra/solicitud-compra.component';
import { OrdenesCompraComponent } from './orden-compra/orden-compra/ordenes-compra.component';
import { OrdenCompraComponent } from './orden-compra/orden-compra/orden-compra.component';
import { EditBudgetCardDetailsComponent } from './cedulaPresupuestalDetalle/edit.component';
import { CedulaClienteComponent } from './cedulaPresupuestal/cedula-cliente.component';
import { EditProductoComponent } from './solicitudCompra/edit-producto.component';
import { PdfSolicitudCompraComponent } from '../reports/pdf-solicitud-compra/pdf-solicitud-compra.component';
import { CuadroComparativoComponent } from './cuadro-comparativo/cuadro-comparativo.component';
import { ModalAddProveedorComponent } from './cuadro-comparativo/modal-add-proveedor/modal-add-proveedor.component';
import { ModalEditCotizacionComponent } from './cuadro-comparativo/modal-edit-cotizacion/modal-edit-cotizacion.component';
import { OrdenCompraDatosPagoComponent } from './orden-compra/orden-compra-datos-pago/orden-compra-datos-pago.component';
import { OrdenCompraStatusComponent } from './orden-compra/orden-compra-status/orden-compra-status.component';
import { CreateOrdenCompraComponent } from './orden-compra/orden-compra/create-orden-compra/create-orden-compra.component';
import { ModalOrdenCompraComponent } from './orden-compra/orden-compra/modal-orden-compra.component';
import { OrdenCompraDetalleAddProductoComponent } from './orden-compra/orden-compra-detalle-add-producto/orden-compra-detalle-add-producto.component';
import { OrdenCompraPresupuestoComponent } from './orden-compra/orden-compra-presupuesto/orden-compra-presupuesto.component';
import { OrdenCompraPdfComponent } from './orden-compra/orden-compra-pdf/orden-compra-pdf.component';
import { OrdenCompraDenegadaComponent } from './orden-compra/orden-compra-denegada/orden-compra-denegada.component';
import { OndenCompraPdfSolicitudPagoComponent } from './orden-compra/onden-compra-pdf-solicitud-pago/onden-compra-pdf-solicitud-pago.component';
import { CatalogoGastosFijosComponent } from './orden-compra/orden-compra-catalogo-gastos-fijos/catalogo-gastos-fijos/catalogo-gastos-fijos.component';
import { FormCatalogoGastosFijosComponent } from './orden-compra/orden-compra-catalogo-gastos-fijos/form-catalogo-gastos-fijos/form-catalogo-gastos-fijos.component';
import { IndexOrdenCompraFijosComponent } from './orden-compra/orden-compra-catalogo-gastos-fijos/index-orden-compra-fijos/index-orden-compra-fijos.component';
import { FormGastosFijosPresupuestoComponent } from './orden-compra/orden-compra-catalogo-gastos-fijos/form-gastos-fijos-presupuesto/form-gastos-fijos-presupuesto.component';
import { FormGastosFijosServiciosComponent } from './orden-compra/orden-compra-catalogo-gastos-fijos/form-gastos-fijos-servicios/form-gastos-fijos-servicios.component';
import { EditOrdenCompraFijosComponent } from './orden-compra/orden-compra-catalogo-gastos-fijos/edit-orden-compra-fijos/edit-orden-compra-fijos.component';
import { ModalOrdenCompraGrastosFijosComponent } from './orden-compra/orden-compra-catalogo-gastos-fijos/modal-orden-compra-grastos-fijos/modal-orden-compra-grastos-fijos.component';
import { FiltroPendienteComponent } from './orden-compra/orden-compra/orden-compra-filtro/filtro-pendiente/filtro-pendiente.component';
import { OrdenCompraPagadasComponent } from './orden-compra/orden-compra/orden-compra-pagadas/orden-compra-pagadas.component';
import { CaratulaFondeoComponent } from './caratula-fondeo/caratula-fondeo.component';
import { VistaCaratulaFondeoComponent } from './caratula-fondeo/vista-caratula-fondeo/vista-caratula-fondeo.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PipesModule } from 'src/app/shared/helpers/pipes/pipes.module';
import { OrdenCompraParcialComponent } from './orden-compra/components/orden-compra-parcial/orden-compra-parcial.component';
import { OrdenCompraDatosPagoParcialComponent } from './orden-compra/components/orden-compra-datos-pago-parcial/orden-compra-datos-pago-parcial.component';
import { OrdenCompraStatusParcialComponent } from './orden-compra/components/orden-compra-status-parcial/orden-compra-status-parcial.component';
import { OrdenCompraAuthParcialComponent } from './orden-compra/components/orden-compra-auth-parcial/orden-compra-auth-parcial.component';
import { OrdenesCompraResumenComponent } from './orden-compra/ordenes-compra-resumen/ordenes-compra-resumen.component';

@NgModule({
  declarations: [
    AddoreditBudgetCardComponent,
    AddoreditChartOfAccountComponent,
    AddBudgetCardDetailsComponent,
    EditBudgetCardDetailsComponent,
    ShoppingComponent,
    IndexChartOfAccountComponent,
    IndexBudgetCardDetailsComponent,
    IndexBudgetCardComponent,
    PaymentMethodComponent,
    WayToPayComponent,
    UseCfdiComponent,
    AddoreditPaymentMethodComponent,
    AddoreditUseCFDIComponent,
    AddoreditWayToPayComponent,

    PurchaseRequestComponent,
    SolicitudCompraComponent,
    AddProductoComponent,
    OrdenesCompraComponent,
    OrdenCompraComponent,
    CedulaClienteComponent,
    EditProductoComponent,
    PdfSolicitudCompraComponent,
    CuadroComparativoComponent,
    ModalAddProveedorComponent,
    ModalEditCotizacionComponent,
    ModalOrdenCompraComponent,
    OrdenCompraPresupuestoComponent,
    OrdenCompraDatosPagoComponent,
    OrdenCompraStatusComponent,
    CreateOrdenCompraComponent,
    OrdenCompraDetalleAddProductoComponent,
    OrdenCompraPdfComponent,
    OrdenCompraDenegadaComponent,
    OndenCompraPdfSolicitudPagoComponent,
    CatalogoGastosFijosComponent,
    FormCatalogoGastosFijosComponent,
    IndexOrdenCompraFijosComponent,
    FormGastosFijosPresupuestoComponent,
    FormGastosFijosServiciosComponent,
    EditOrdenCompraFijosComponent,
    ModalOrdenCompraGrastosFijosComponent,
    FiltroPendienteComponent,
    OrdenCompraPagadasComponent,
    CaratulaFondeoComponent,
    VistaCaratulaFondeoComponent,
    OrdenCompraParcialComponent,
    OrdenCompraDatosPagoParcialComponent,
    OrdenCompraStatusParcialComponent,
    OrdenCompraAuthParcialComponent,
    OrdenesCompraResumenComponent,
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
})
export class ShoppingModule {}
