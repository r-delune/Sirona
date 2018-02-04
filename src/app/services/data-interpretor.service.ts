import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app'; 
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import { DietItem } from '../log-item-form/log-item-form.component';
import { DatastoreService } from '../services/datastore.service';

declare var jquery:any;
declare var $ :any;

@Injectable()
export class DataInterpretorService {

  morningLogCount
  afternoonLogCount
  eveningLogCount
  nightLogCount
  logItems
  type

  constructor(authService: AuthService,
    private datastoreService: DatastoreService,
    private db:AngularFireDatabase) {
  }

  getUserLogTimesByType(type){
   // this.type = 'Exercise'
    this.type = type
    console.log('getting user log times for - ' + this.type)

    if (this.type == 'Diet'){
      this.logItems = this.datastoreService.getUserDietItemsList()
    }else if (this.type == 'Sleep'){
      this.logItems = this.datastoreService.getUserSleepItemsList()
    }else if (this.type == 'Mood'){
      this.logItems = this.datastoreService.getUserMoodItemsList()
    }else if (this.type == 'Exercise'){
      this.logItems = this.datastoreService.getUserExerciseItemsList()
    }

    //SHOULD START AT 0
    this.morningLogCount = 10
    this.afternoonLogCount = 10
    this.eveningLogCount = 10
    this.nightLogCount = 10

    $.each(this.logItems, function(key, value) {
      //very inefficient. considering changing data model i.i removing sleepEntry node
      if (this.type == 'Diet'){
        var myDate = new Date(value.dietEntry.date);
        var minutes = myDate.getMinutes();
        var hours = myDate.getHours();      
  
      }else if (this.type == 'Sleep'){
        var myDate = new Date(value.sleepEntry.date);
        var minutes = myDate.getMinutes();
        var hours = myDate.getHours();      
  
      }else if (this.type == 'Mood'){
        var myDate = new Date(value.moodEntry.date);
        var minutes = myDate.getMinutes();
        var hours = myDate.getHours();      
  
      }else if (this.type == 'Exercise'){
        var myDate = new Date(value.exerciseEntry.date);
        var minutes = myDate.getMinutes();
        var hours = myDate.getHours();      
      }

      if (hours > 6 && hours < 12){
        this.morningLogCount = this.morningLogCount+1
        console.log('adding ' + this.morningLogCount)
      }else if (hours > 12 && hours < 17){
        this.afternoonCount = this.afternoonCount+1
        console.log('adding ' + this.afternoonCount)
      }else if (hours > 17 && hours < 21){
        this.eveningCount = this.eveningCount+1
        console.log('adding ' + this.eveningCount)
      }else if (hours > 21 || hours < 6){
        console.log(this.nightCount)
        this.nightCount = this.nightCount+1
        console.log('adding ' + this.nightCount)
      }
    });

    //create object above
    //determine diffenrence between two arrays
    var data1 = [
      { "name": "Morning", "value": this.morningLogCount},
      { "name": "Afternoon","value": this.afternoonLogCount},
      { "name": "Evening", "value": this.eveningLogCount },
      { "name": "Night", "value": this.nightLogCount }
    ];

    var data2 = [
      { "name": "Morning","series" : [{ "name": "Morning","value": this.morningLogCount},{ "name": "Morning","value": this.morningLogCount}]},
      { "name": "Afternoon", "series" : [{"name": "Afternoon", "value": this.afternoonLogCount},{ "name": "Afternoon", "value": this.afternoonLogCount}]},
      { "name": "Evening","series" : [{"name": "Evening", "value": this.eveningLogCount},{ "name": "Evening", "value": this.eveningLogCount}]},
      { "name": "Night","series" : [{"name": "Night", "value": this.nightLogCount},{ "name": "Night", "value": this.nightLogCount}]}
    ]; 


    return {data1, data2}
  }
}
