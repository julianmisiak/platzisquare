import {Pipe, PipeTransform} from '@angular/core';
import * as linkifyStr from 'linkifyjs/string';

@Pipe({name: 'linkyfystr'})

export class LinkifystrPipe implements PipeTransform {
  transform(str: string): string {
    return str ? linkifyStr(str, {target: '_system'}) : str;
  }

}
