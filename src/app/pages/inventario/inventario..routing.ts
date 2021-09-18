import { IndexEntradasComponent } from './entradas/index-entradas/index-entradas.component';
import { IndexSalidasComponent } from './salidas/index-salidas.component';
import { IndexInventarioProductosComponent } from './inventarioProductos/index-inventario-productos.component';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { IndexProductosComponent } from './productos/index-productos.component';

export const INVENTARIO_ROUTES: Routes = [
  // ...Productos
  { path: 'productos', component: IndexProductosComponent },
  {
    path: 'inventarioProductos',
    component: IndexInventarioProductosComponent,
  },

  {
    path: 'salidaProductos',
    component: IndexSalidasComponent,
  },
  {
    path: 'entradaProductos',
    component: IndexEntradasComponent,
  },
];
@NgModule({
  imports: [],
})
export class InventarioRoutingModule {}
