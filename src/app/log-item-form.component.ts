import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LogItemService } from './log-item.service';
import { lookupListToken } from './providers';
import { NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';
import { EventEmitter } from '@angular/core'

import {  AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireList, AngularFireDatabase, AngularFireDatabaseProvider, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

export interface Item { name: string; }

@Component({
  selector: 'mw-log-item-form',
  templateUrl: './log-item-form.component.html',
  styleUrls: ['./log-item-form.component.css']
})

export class LogItemFormComponent {
  form;
  logItems;
  private logCollection: AngularFirestoreCollection<Item>;  
  items: Observable<Item[]>;
  public task;
  public firebase;
  item: Observable<any>;
  log: Observable<any>;
  itemRef : AngularFireObject<any>;
  logRef :  AngularFireObject<any>;
  logLengthID;  
  logList: AngularFireList<any>;
  logItem;
  date = new Date


  constructor(
    private formBuilder: FormBuilder,
    private logItemService: LogItemService, 
    db: AngularFireDatabase, 
    afc: AngularFirestore, 
    @Inject(lookupListToken) public lookupLists,
    private router: Router
  ) {
    this.logCollection = afc.collection<Item>('Users/0/log');
    this.items = this.logCollection.valueChanges();

    const collection: AngularFirestoreCollection<Item> = afc.collection('Users/0/log');
    
    this.logList = db.list('Users/0/log');
    this.logItem = this.logList.valueChanges();
   
    this.itemRef = db.object('Users');
    this.item = this.itemRef.valueChanges();

    this.logRef = db.object('Users/0/log');
    this.log = this.logRef.valueChanges()

    const users: AngularFireObject<Item> = db.object('Users')
    const logs: AngularFireObject<Item> = db.object('Users/0/log')
  }


  someRange2config: any = {
    behaviour: 'drag',
    start: [0, 100],

    range: {
      min: 0,
      max: 100
    }
 
  };





  ngOnInit() {

    

    this.log.subscribe((log) => {
      console.log('FORM:  items')
      console.log(log)
      this.logLengthID = log.length
      console.log('COUNT : ' + log.length )
    });
      console.log('FORM')
      console.log(this.logItems)
      const date = Date.now()
    
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

