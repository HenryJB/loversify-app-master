import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
/**
 * Generated class for the StriphtmlPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'striphtml',
})
export class StriphtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
  /**
   * Remove html tags from test
   */
  transform(value: string, ...args) {


    value =  value.replace(/\[in-app-link/g ,'<a in-app-link'); //"/[in-app-link/g", '<a in-app-link');
        value =  value.replace(/\[\/in-app-link]/g, "</a>");

        value =  value.replace(/\]/g, ">");
        var vat = this.sanitizer.bypassSecurityTrustHtml(value);
        return vat
  }
}
