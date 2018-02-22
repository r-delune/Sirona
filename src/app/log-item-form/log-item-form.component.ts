import { Component, Inject, OnInit } from '@angular/core';
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
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { LogMoodItemFormComponent } from '../log-mood-item-form/log-mood-item-form.component';
import { LogSleepItemFormComponent } from '../log-sleep-item-form/log-sleep-item-form.component';
import { LogDietItemFormComponent } from '../log-diet-item-form/log-diet-item-form.component';
import {MatButtonModule} from '@angular/material/button';

declare var jquery:any;
declare var $ :any;
export interface Item { name: string; }
export class Log { body: string; }
export class MoodItem { body: string; }
export class DietItem { body: string; }
export class ExcerciseItem { body: string; }
export class SleepItem { body: string; }

@Component({
  selector: 'mw-log-item-form',
  templateUrl: './log-item-form.component.html',
  styleUrls: ['./log-item-form.component.css']
})

export class LogItemFormComponent  {
  dietForm;
  addExcerciseItemForm;
  addSleepItemForm;
  addDietItemForm;
  addMoodItemForm;
  MoodForm
  form
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
    private router: Router) { }

  someRange2config: any = {
    behaviour: 'drag',
    start: [0, 100],
    range: {
      min: 0,
      max: 100
    }
  };

  ngOnInit(){
    
    console.log('Add has initialised')
    $('.addEntry').fadeOut(1000)
    $('button').fadeIn(1000)

    var $btn = document.querySelector('.btn');
    $btn.addEventListener('click', e => {
      window.requestAnimationFrame(() => {
        $btn.classList.remove('is-animating');
        
        window.requestAnimationFrame(() => {
          $btn.classList.add('is-animating');
        });
      });
    });
  }

  navigateToMoodForm(){
    console.log('NAVIGATING TO MOOD FORM')
    this.router.navigate(['/moodForm']);
  }
}