import { Pipe } from '@angular/core';

@Pipe({
  name: 'categoryList'
})
export class CategoryListPipe {
  transform(logItems) {
    var categories = [];
    logItems.forEach(logItems => {
      if (categories.indexOf(logItems.category) <= -1) {
        categories.push(logItems.category);
      }
    });
    return categories.join(', ');
  }
}