import { CedulaClienteComponent } from './cedulaPresupuestal/cedula-cliente.component';
import { OrdenesCompraComponent } from './orden-compra/orden-compra/ordenes-compra.component';
import { PaymentMethodComponent } from './metodoDePago/payment-method.component';
import { UseCfdiComponent } from './usoCfdi/use-cfdi.component';
import { WayToPayComponent } from './formaDePago/way-to-pay.component';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { IndexChartOfAccountComponent } from './catalogoCuentas/index.component';
import { IndexBudgetCardComponent } from './cedulaPresupuestal/index.component';
import { IndexBudgetCardDetailsComponent } from './cedulaPresupuestalDetalle/index.component';
import { PurchaseRequestComponent } from './solicitudCompra/index-solicitud-compra.component';
import { SolicitudCompraComponent } from './solicitudCompra/solicitud-compra.component';
import { OrdenCompraComponent } from './orden-compra/orden-compra/orden-compra.component';
import { CuadroComparativoComponent } from './cuadro-comparativo/cuadro-comparativo.component';
import { OrdenCompraPdfComponent } from './orden-compra/orden-compra-pdf/orden-compra-pdf.component';
import { OndenCompraPdfSolicitudPagoComponent } from './orden-compra/onden-compra-pdf-solicitud-pago/onden-compra-pdf-solicitud-pago.component';
import { CatalogoGastosFijosComponent } from './orden-compra/orden-compra-catalogo-gastos-fijos/catalogo-gastos-fijos/catalogo-gastos-fijos.component';
import { IndexOrdenCompraFijosComponent } from './orden-compra/orden-compra-catalogo-gastos-fijos/index-orden-compra-fijos/index-orden-compra-fijos.component';
import { EditOrdenCompraFijosComponent } from './orden-compra/orden-compra-catalogo-gastos-fijos/edit-orden-compra-fijos/edit-orden-compra-fijos.component';
import { OrdenCompraPagadasComponent } from './orden-compra/orden-compra/orden-compra-pagadas/orden-compra-pagadas.component';
import { VistaCaratulaFondeoComponent } from './caratula-fondeo/vista-caratula-fondeo/vista-caratula-fondeo.component';
import { OrdenesCompraResumenComponent } from './orden-compra/ordenes-compra-resumen/ordenes-compra-resumen.component';

// Rutas

export const SHOPPING_ROUTES: Routes = [
  { path: 'chartOfAccount', component: IndexChartOfAccountComponent },
  { path: 'budgetCard', component: IndexBudgetCardComponent },
  { path: 'budgetCardDetail/:id', component: IndexBudgetCardDetailsComponent },
  // ... Forma de Pago  // ...Metodo de Pago
  { path: 'paymentMethod', component: PaymentMethodComponent },
  { path: 'useCfdi', component: UseCfdiComponent },
  { path: 'wayToPay', component: WayToPayComponent },

  {
    path: 'purchaseRequest',
    component: PurchaseRequestComponent,
  },
  {
    path: 'solicitudCompra/:id',
    component: SolicitudCompraComponent,
  },

  {
    path: 'ordenesCompra',
    component: OrdenesCompraComponent,
  },
  {
    path: 'ordenesCompraPagadas',
    component: OrdenCompraPagadasComponent,
  },
  {
    path: 'ordenCompra/:id',
    component: OrdenCompraComponent,
  },
  {
    path: 'ordenCompraFijo/:id',
    component: EditOrdenCompraFijosComponent,
  },
  {
    path: 'ordenCompraPdf/:id',
    component: OrdenCompraPdfComponent,
  },
  {
    path: 'ordenCompraSolicitudPago/:id',
    component: OndenCompraPdfSolicitudPagoComponent,
  },
  {
    path: 'cuadroComparativo/:id',
    component: CuadroComparativoComponent,
  },
  {
    path: 'cedulaCliente',
    component: CedulaClienteComponent,
  },
  {
    path: 'indexGastosFijos',
    component: IndexOrdenCompraFijosComponent,
  },
  {
    path: 'catalogoGastosFijos',
    component: CatalogoGastosFijosComponent,
  },
  {
    path: 'caratulaFondeo',
    component: VistaCaratulaFondeoComponent,
  },
  {
    path: 'ordenesCompraResumen',
    component: OrdenesCompraResumenComponent,
  },
];
@NgModule({
  imports: [],
})
export class ShoppingRoutingModule {}
