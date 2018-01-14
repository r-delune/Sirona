import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MoodItemService } from './mood-item.service';
import { lookupListToken } from './providers';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

export interface Item { name: string; }

@Component({
  selector: 'mw-mood-item-form',
  templateUrl: './mood-item-form.component.html',
  styleUrls: ['./mood-item-form.component.css']
})



export class MoodItemFormComponent {
  form;
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(
    private formBuilder: FormBuilder,
    //allow access to media item service so we can add 
    private moodItemService: MoodItemService,   
    private afs: AngularFirestore,
    items: Observable<Item[]>,
    //tells angular that we want the lookuplist value item
    //we want to use this in the template markup so we can render out the select options in the form
    // we are using the opaque token we created, this is value type injection
    @Inject(lookupListToken) public lookupLists,
    private router: Router
  ) {

    this.itemsCollection = afs.collection<Item>('moodItems');
    this.items = this.itemsCollection.valueChanges();


  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id:Math.random(),
      medium:'Sleeep',
      date: this.formBuilder.control(new Date()),
      generalMood: this.formBuilder.control('50'),
      appetite: this.formBuilder.control('50', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      //sleep: new FormControl('50'),
      timeOfDay: this.formBuilder.control('50'),
      sleepQuality: this.formBuilder.control('50'),
      sleepDifficulty: this.formBuilder.control('50'),
      sleepDreamIntensity: this.formBuilder.control('50'),
      sleepParalysis: this.formBuilder.control('50'),
      sleepNotes: this.formBuilder.control('A fine sleep'),
      pleasureCapacity: this.formBuilder.control('50'),
      energyLevel: this.formBuilder.control('50'),
      motivation: this.formBuilder.control('50'),
      selfWorth: this.formBuilder.control('50'),
      concentration: this.formBuilder.control('50', this.percentageValidator),
      //extStressors: new FormControl(),
      dietaryNotes: this.formBuilder.control('Coffee and nicotine'),
      stressEvents: this.formBuilder.control('Nothing worth mentioning'),
      percievedMoodInfluence: this.formBuilder.control('50'),
      additionalNotes: this.formBuilder.control('50')
      })  
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

    

  onSubmit(item: Item) {
   // this.moodItemService.add(moodItem)
    console.log('submitting')
    //const items = this.db.list('items');
    //items.push('new item');


      this.itemsCollection.add(item);
    }

    //  .subscribe(() => {
    //    this.router.navigate(['/', moodItem.medium]);
    //  });
  }

