import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transform only the first letter of a string to upper case.
 * hello world! -> Hello world!
 */

@Pipe({ name: 'firstLetterUpperCase' })
export class FirstLetterUpperCasePipe implements PipeTransform {
  transform(value: string): string {
    let result = [];
    result = value.split('');
    result[0] = result[0].toUpperCase();

    return result.join('');
  }
}
