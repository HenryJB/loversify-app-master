import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the StriphtmlPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'striphtml',
})
export class StriphtmlPipe implements PipeTransform {
  /**
   * Remove html tags from test
   */
  transform(value: string, ...args) {
    return   value ? String(value).replace(/<[^>]+>/gm, '') : '';
  }
}
