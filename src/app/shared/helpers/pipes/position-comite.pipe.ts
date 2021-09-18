import { Pipe, PipeTransform } from '@angular/core';
import { EPositionComite } from '../../enums/EPositionComite';

@Pipe({
  name: 'ePositionComite',
})
export class EPositionComitePipe implements PipeTransform {
  enum: any[] = EPositionComite.GetEnum();
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
