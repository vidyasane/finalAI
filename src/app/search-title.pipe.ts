import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTitle'
})
export class SearchTitlePipe implements PipeTransform {

  transform(value, title): any {
    if (!title) {
      return value;
    }
    else {
      title = title.toLowerCase();
      return value.filter(response => response.title.toLowerCase().match(title));
    }
  }

}
