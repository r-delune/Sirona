import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


import { MoodItemService } from './mood-item.service';
import { lookupListToken } from './providers';



@Component({
  selector: 'mw-mood-item-log',
  templateUrl: './mood-item-log.component.html',
  styleUrls: ['./mood-item-log.component.css']
})

export class MoodItemLogComponent {
  list;
  medium = '';
  moodItems = [];
  paramsSubscription;

  constructor(
    private formBuilder: FormBuilder,
    //allow access to media item service so we can add 
    private moodItemService: MoodItemService,  
    private activatedRoute: ActivatedRoute) {}
    //tells angular that we want the lookuplist value item
    //we want to use this in the template markup so we can render out the select options in the form
    // we are using the opaque token we created, this is value type injection


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

      console.log('MOOD ITEMS')
      console.log(this.moodItems)
  }


  percentageValidator(control){
    if (control.value.trim().length === 0){
      return null
    }

    let inputValue = parseInt(control.value)
    let minValue = 1;
    let maxValue = 100;

    if (inputValue >= minValue && inputValue <= maxValue){
      return null
    }else{
      return { 
        'inputValue': {
        min: minValue,
        max: maxValue
      }
    }
 }
}

}
