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
declare var jquery:any;
declare var $ :any;


export class MoodItem { body: string; }

@Component({
  selector: 'app-log-mood-item-form',
  templateUrl: './log-mood-item-form.component.html',
  styleUrls: ['./log-mood-item-form.component.css']
})
export class LogMoodItemFormComponent {

  addMoodItemForm
  userId

  constructor(private formBuilder: FormBuilder, private angularAuth: AngularFireAuth,
    private router: Router) { 
    this.angularAuth.authState.subscribe((user) => {
      this.userId = user.uid;
    })
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


    console.log('MOOD FORM')

    this.addMoodItemForm = this.formBuilder.group({
      id: this.userId,
      date: this.formBuilder.control(new Date(Date.now()).toLocaleString()),
      generalMood: this.formBuilder.control('No Entry'),
      energyLevel: this.formBuilder.control('No Entry'),
      motivationLevel: this.formBuilder.control('No Entry'),  
      concentrationLevel: this.formBuilder.control('No Entry'),
      anxietyLevel: this.formBuilder.control('No Entry'),
      stressEvents: this.formBuilder.control('No Entry'),
      extEffectOnMood: this.formBuilder.control('No Entry'),
      additionalNotes: this.formBuilder.control('No Entry')
    })

  }

  onSubmitMood(moodItem: MoodItem) {
    console.log('submitting sleep form')
    console.log(moodItem)
    //this.saveLogItem(this.logLengthID, item);
   // this.datastoreService.addLogItem(item)
  }
}
