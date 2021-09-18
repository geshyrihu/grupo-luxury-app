import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CurrencyMexicoPipe',
})
export class CurrencyMexicoPipe implements PipeTransform {
  transform(value: any): string {
    return `$ ${(Math.round(value * 100) / 100).toString()}`;
  }
}
