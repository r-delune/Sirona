import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoodItemService } from './mood-item.service';

@Component({
  selector: 'mw-mood-item-list',
  templateUrl: './mood-item-list.component.html',
  styleUrls: ['./mood-item-list.component.css']
})
export class MoodItemListComponent {
  medium = '';
  moodItems = [];
  paramsSubscription;

  constructor(
    //refers to an instance of my service
    private moodItemService: MoodItemService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params
      .subscribe(params => {
        let medium = params['medium'];
        if(medium.toLowerCase() === 'all') {
          medium = '';
        }
        this.getMoodItems(medium);
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  onMoodItemDelete(moodItem) {
    this.moodItemService.delete(moodItem)
      .subscribe(() => {
        this.getMoodItems(this.medium);
      });
  }

  getMoodItems(medium) {
    this.medium = medium;
    this.moodItemService.get(medium)
      .subscribe(moodItems => {
        this.moodItems = moodItems;
      });
  }

  
}
