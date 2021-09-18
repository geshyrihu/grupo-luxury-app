import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eBoolText',
})
export class EBoolTextPipe implements PipeTransform {
  transform(value: boolean): string {
    var dato: string = '';
    if (value === false) {
      dato = 'No';
    } else {
      dato = 'Si';
    }
    return dato;
  }
}
