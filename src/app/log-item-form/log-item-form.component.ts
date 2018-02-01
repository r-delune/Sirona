import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { lookupListToken } from '../providers';
import { NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DatastoreService } from '../services/datastore.service'
import { AngularFirestoreCollection, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList } from 'angularfire2/database/interfaces';


export interface Item { name: string; }

export class Log { body: string; }

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
  itemRef
  userId
itemList




  constructor(
    private formBuilder: FormBuilder,
    private datastoreService: DatastoreService, 
    private db: AngularFireDatabase,
    authService: AuthService,
    private angularAth: AngularFireAuth,
    @Inject(lookupListToken) public lookupLists,
    private router: Router
  ) { 
    
    this.angularAth.authState.subscribe((user) => {
      this.userId = user.uid;
    })

    //this.itemRef = db.object(`Logs/${this.userId}`);
   // this.itemList = db.list(`Logs/${this.userId}`);
    db.list<Log>('Logs').valueChanges().subscribe(console.log);
  
    db.list('Log').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe(items => {
      return items.map(item => item.key);
    });
  }

  someRange2config: any = {
    behaviour: 'drag',
    start: [0, 100],

    range: {
      min: 0,
      max: 100
    }
  };


  //getItemsList:<>{
//
  // this.currentUserLogs = this.db.object(`Logs/${this.userId}`)

  //  return this.currentUserLogs
  //}

  ngOnInit() {

   // getItemsList()

    this.form = this.formBuilder.group({
      id: Math.random(),
      date: this.formBuilder.control(new Date(Date.now()).toLocaleString()),
      timeOfDay: this.formBuilder.control('50'),
      generalMood: this.formBuilder.control('50'),
      appetite: this.formBuilder.control('50', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      sleepQuality : this.formBuilder.control('50'),
      sleepDifficulty: this.formBuilder.control('50'),
      energyLevel: this.formBuilder.control('50'),
      motivation: this.formBuilder.control('50'),  
      concentration: this.formBuilder.control('50'),
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
   // this.saveLogItem(this.logLengthID, item);

    this.datastoreService.addLogItem(item)
  }

  saveLogItem(idNo: string, item: Item) {
    console.log('saving  item')
    console.log(item)
    const count = this.logLengthID

    //const afList = this.db.list(`Logs/${this.userId}`);
    //afList.push({ item });
   // const listObservable = afList.snapshotChanges();
   // listObservable.subscribe();

   {


    
   }

    //this.logList.push( item).then((item) => { console.log('success - item key is: ' + item.key); });
   // this.itemList.push( item).then((item) => { console.log('success - item key is: ' + item.key); });
  //this.itemRef.set( item).then((item) => { console.log('success - item key is: ' + item.key); });
  }
}