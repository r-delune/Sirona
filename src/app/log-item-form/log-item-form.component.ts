import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { lookupListToken } from '../providers';
import { NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DatastoreService } from '../services/datastore.service'
import { AngularFirestoreCollection } from 'angularfire2/firestore';

import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';

export interface Item { name: string; }

@Component({
  selector: 'mw-log-item-form',
  templateUrl: './log-item-form.component.html',
  styleUrls: ['./log-item-form.component.css']
})

export class LogItemFormComponent {
  form;
  logLengthID;
  date = new Date
  logList

  constructor(
    private formBuilder: FormBuilder,
    private datastoreService: DatastoreService, 
    authService: AuthService,
    @Inject(lookupListToken) public lookupLists,
    private router: Router
  ) {  }

  someRange2config: any = {
    behaviour: 'drag',
    start: [0, 100],

    range: {
      min: 0,
      max: 100
    }
  };

  ngOnInit() {

  

    this.form = this.formBuilder.group({
      id: Math.random(),
      date: this.formBuilder.control(new Date(Date.now()).toLocaleString()),
      timeOfDay: this.formBuilder.control('50'),
      generalMood: this.formBuilder.control('50'),
      appetite: this.formBuilder.control('50', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      sleepQuality : this.formBuilder.control,
      sleepDifficulty: this.formBuilder.control('50'),
      energyLevel: this.formBuilder.control('50'),
      motivation: this.formBuilder.control('50'),  
      concentration: this.formBuilder.control('50', this.percentageValidator),
      excerciseNotes: this.formBuilder.control('Kettle bell routine, 6 reps chin ups, 4k run'),
      stressEvents: this.formBuilder.control('Nothing worth mentioning'),
      coffee: this.formBuilder.control(true),
      supplements: this.formBuilder.control('1 Pharmoton multivitamin'),
      dietaryNotes: this.formBuilder.control('2 sandwiches, 10cal bar, stir fry'),
      sleepNotes: this.formBuilder.control('A fine sleep'),
      additionalNotes: this.formBuilder.control('None')
      })
  }

  onChange(event){
    console.log('change')
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
    console.log('submitting form')
    console.log(item)
    this.saveLogItem(this.logLengthID, item);
  }

  saveLogItem(idNo: string, item: Item) {
    console.log('saving  item')
    console.log(item)
    const count = this.logLengthID
    this.logList.push( item).then((item) => { console.log('success - item key is: ' + item.key); });
   }
}