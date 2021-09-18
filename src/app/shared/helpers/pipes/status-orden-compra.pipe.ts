import { Pipe, PipeTransform } from '@angular/core';
import { EStatusOrdenCompra } from 'src/app/shared/enums/EStatusOrdenCompra';

@Pipe({
  name: 'eStatusOrdenCompra',
})
export class EStatusOrdenCompraPipe implements PipeTransform {
  enum: any[] = EStatusOrdenCompra.GetEnum();
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
