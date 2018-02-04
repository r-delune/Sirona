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


import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../data';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { TreeModel, NodeEvent, Ng2TreeSettings } from 'ng2-tree';

declare var jquery:any;
declare var $ :any;

export class SleepItem { body: string; }

@Component({
  selector: 'app-log-sleep-item-form',
  templateUrl: './log-sleep-item-form.component.html',
  styleUrls: ['./log-sleep-item-form.component.css']
})
export class LogSleepItemFormComponent {

  addSleepItemForm
  userId

  constructor(private formBuilder: FormBuilder,
  private angularAuth: AngularFireAuth,
    private datastoreService: DatastoreService, 
  private router: Router) { 
    this.angularAuth.authState.subscribe((user) => {
      this.userId = user.uid;
      console.log('SLEEP FORM3')
    })

    console.log('SLEEP FORM2')

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

    console.log('SLEEP FORM')

    this.addSleepItemForm = this.formBuilder.group({
      userId: this.userId,
      date: this.formBuilder.control(new Date(Date.now()).toLocaleString()),
      hoursSleptOn : this.formBuilder.control('No Entry'),
      noOfHoursSlept : this.formBuilder.control('No Entry'),
      sleepQuality : this.formBuilder.control('No Entry'),
      sleepDifficulty: this.formBuilder.control('No Entry'),
      sleepNotes: this.formBuilder.control('No Entry'),
      natureOfDreams: this.formBuilder.control('No Entry'),
    })
  }

  onSubmit() {
    if (this.addSleepItemForm.valid) {
      this.datastoreService.addSleepEntry(this.addSleepItemForm.value)
      this.router.navigate(['/add'])
    }
}
}
