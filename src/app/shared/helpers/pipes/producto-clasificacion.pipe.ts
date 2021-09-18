import { EProductClasificacion } from 'src/app/shared/enums/EProductClasificacion';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eProductoClasificacion',
})
export class EProductoClasificacionPipe implements PipeTransform {
  enum: any[] = EProductClasificacion.GetEnum();
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
