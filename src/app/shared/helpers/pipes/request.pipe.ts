import { Pipe, PipeTransform } from '@angular/core';
import { ERequest } from '../../enums/ERequest';

@Pipe({
  name: 'eRequest',
})
export class ERequestPipe implements PipeTransform {
  enum: any[] = ERequest.GetEnum();
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
