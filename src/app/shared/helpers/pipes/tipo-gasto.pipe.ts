import { Pipe, PipeTransform } from '@angular/core';
import { ETipoGasto } from 'src/app/shared/enums/ETipoGasto';

@Pipe({
  name: 'eTipoGasto',
})
export class ETipoGastoPipe implements PipeTransform {
  enum: any[] = ETipoGasto.GetEnum();
  transform(value: unknown): string {
    var dato: string = '';
    if (value === null) {
      dato = '';
    } else {
      this.enum.forEach((item) => {
        if (value === item.value) {
          dato = item.label;
        }
      });
    }
    return dato;
  }
}
