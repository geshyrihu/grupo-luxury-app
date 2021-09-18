import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/shared/helpers/pipes/pipes.module';
/// ....Componentes
import { CrudProductosComponent } from './productos/crud-productos.component';
import { IndexSalidasComponent } from './salidas/index-salidas.component';
import { CrudSalidasComponent } from './salidas/crud-salidas.component';
import { IndexEntradasComponent } from './entradas/index-entradas/index-entradas.component';
import { IndexInventarioProductosComponent } from './inventarioProductos/index-inventario-productos.component';
import { CrudInventarioProductosComponent } from './inventarioProductos/crud-inventario-productos.component';
import { InventarioComponent } from './inventario.component';
import { IndexProductosComponent } from './productos/index-productos.component';
import { AddProductosComponent } from './inventarioProductos/add-productos.component';
import { TarjetaProductoComponent } from './tarjeta-producto/tarjeta-producto.component';
import { FormEntradasComponent } from './entradas/form-entradas/form-entradas.component';

@NgModule({
  declarations: [
    CrudProductosComponent,
    IndexSalidasComponent,
    CrudSalidasComponent,
    FormEntradasComponent,
    IndexEntradasComponent,
    IndexInventarioProductosComponent,
    CrudInventarioProductosComponent,
    InventarioComponent,
    IndexProductosComponent,
    AddProductosComponent,
    TarjetaProductoComponent,
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
export class InventarioModule {}
