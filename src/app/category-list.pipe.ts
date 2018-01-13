import { Pipe } from '@angular/core';

@Pipe({
  name: 'categoryList'
})
export class CategoryListPipe {
  transform(moodItems) {
    var categories = [];
    moodItems.forEach(moodItems => {
      if (categories.indexOf(moodItems.category) <= -1) {
        categories.push(moodItems.category);
      }
    });
    return categories.join(', ');
  }
}