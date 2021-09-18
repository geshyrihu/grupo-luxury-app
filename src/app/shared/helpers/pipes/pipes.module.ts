import { CurrencyMexicoPipe } from './currencyMexico.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ERecurrencePipe } from './recurrence.pipe';
import { EMonthPipe } from './month.pipe';
import { EDayPipe } from './day.pipe';
import { EStatusPipe } from './status.pipe';
import { EPriorityPipe } from './priority.pipe';
import { ERequestPipe } from './request.pipe';
import { ETypeMeetingPipe } from './typeMeeting.pipe';
import { EPositionComitePipe } from './position-comite.pipe';
import { HabitantPipe } from './habitant.pipe';
import { DomseguroPipe } from './domseguro.pipe';
import { EStatusCompraPipe } from './statusCompra.pipe';
import { EStatusOrdenCompraPipe } from './status-orden-compra.pipe';
import { EProductoClasificacionPipe } from './producto-clasificacion.pipe';
import { ETipoGastoPipe } from './tipo-gasto.pipe';
import { EBoolTextPipe } from './bool-text.pipe';

@NgModule({
  declarations: [
    ERecurrencePipe,
    EMonthPipe,
    EDayPipe,
    EStatusPipe,
    EPriorityPipe,
    ERequestPipe,
    ETypeMeetingPipe,
    EPositionComitePipe,
    HabitantPipe,
    DomseguroPipe,
    EStatusCompraPipe,
    CurrencyMexicoPipe,
    EStatusOrdenCompraPipe,
    EProductoClasificacionPipe,
    ETipoGastoPipe,
    EBoolTextPipe,
  ],
  imports: [CommonModule],
  exports: [
    ERecurrencePipe,
    EMonthPipe,
    EDayPipe,
    EStatusPipe,
    EPriorityPipe,
    ERequestPipe,
    ETypeMeetingPipe,
    EPositionComitePipe,
    HabitantPipe,
    DomseguroPipe,
    EStatusCompraPipe,
    CurrencyMexicoPipe,
    EStatusCompraPipe,
    EStatusOrdenCompraPipe,
    EProductoClasificacionPipe,
    ETipoGastoPipe,
    EBoolTextPipe,
  ],
})
export class PipesModule {}
