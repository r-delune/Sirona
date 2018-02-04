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

export class ExerciseItem { body: string; }

@Component({
  selector: 'app-log-excercise-item-form',
  templateUrl: './log-excercise-item-form.component.html',
  styleUrls: ['./log-excercise-item-form.component.css']
})
export class LogExcerciseItemFormComponent {

  addExerciseItemForm
  userId
  someRange2config: any = {
    behaviour: 'drag',
    start: [0, 100],
    range: {
      min: 0,
      max: 100
    }
  };

  constructor(private formBuilder: FormBuilder, private angularAuth: AngularFireAuth, 
    private router: Router, 
    private datastoreService: DatastoreService, 
    private db: AngularFireDatabase,
    authService: AuthService,
    private angularAth: AngularFireAuth,
  ) { 
    this.angularAuth.authState.subscribe((user) => {
      this.userId = user.uid;
    })
  }

  ngOnInit() {
    console.log('EXERCIOSE FORM')

    this.addExerciseItemForm = this.formBuilder.group({
      id: this.userId,
      date: this.formBuilder.control(new Date(Date.now()).toLocaleString()),
      kmRan: this.formBuilder.control('No Entry'),
      kmWalked: this.formBuilder.control('No Entry'),
      kmCycled : this.formBuilder.control('No Entry'),
      kmSwam : this.formBuilder.control('No Entry'),
      pressUps: this.formBuilder.control('No Entry'),
      pullUps: this.formBuilder.control('No Entry'),
      additionalNotes: this.formBuilder.control('No Entry'),
    })
  }

  onSubmitExercise(excerciseItem: ExerciseItem) {
    console.log('submitting diet form')
    console.log(excerciseItem)
    //this.saveLogItem(this.logLengthID, item);
    //this.datastoreService.addLogItem(item)
  }

  onSubmit() {
    if (this.addExerciseItemForm.valid) {
      this.datastoreService.addExerciseEntry(this.addExerciseItemForm.value)
      this.router.navigate(['/add'])
    }

}
}