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

export class Item {
  name: string;
  value: number
}

export class MultiItem {
  name: string;
  series: Item
}

@Injectable()
export class DataInterpretorService {

  morningLogCount
  afternoonLogCount
  eveningLogCount
  nightLogCount
  logItems
  type
  currentUserMoodItems
  currentUserDietItems
  currentUserExerciseItems
  currentUserSleepItems
  appetiteData
  generalMoodData
  sleepQualityData 
  energyLevelData

  constructor(authService: AuthService,
    private datastoreService: DatastoreService,
    private db:AngularFireDatabase) {
  }

  getGeneralMoodTrend(){
    console.log('getGeneralMoodTrend')
    let data =  {} as Item;
    let array= [];
    this.currentUserMoodItems = this.datastoreService.getUserMoodItemsList()
    $.each(this.currentUserMoodItems, function(key, value) { 
      if (value.moodEntry.date){data.name = value.moodEntry.date}else{data.name = 'TEMP'}  
      data.name = value.moodEntry.date
      console.log(value.moodEntry)
      data.value = value.moodEntry.generalMood[1]
      array.push(data)
    })
    return array;
  }

  getAppetiteTrend(){
    console.log('getAppetiteTrend')
    let data =  {} as Item;
    let array= [];
    this.currentUserDietItems = this.datastoreService.getUserDietItemsList()
    $.each(this.currentUserDietItems, function(key, value) {
      if (value.dietEntry.date){data.name = value.dietEntry.date}else{data.name = 'TEMP'}  
      data.name = value.dietEntry.date
      data.value = value.dietEntry.appetiteLevel[1]
      array.push(data)
    })
    return array;
  }

  getSleepQualityTrend(){
    console.log('getSleepQualityTrend')
    let data =  {} as Item;
    let array= [];
    this.currentUserSleepItems = this.datastoreService.getUserSleepItemsList()
    $.each(this.currentUserSleepItems, function(key, value) {
      if (value.sleepEntry.date){data.name = value.sleepEntry.date}else{data.name = 'TEMP'}  
      data.name = value.sleepEntry.date
      data.value = value.sleepEntry.sleepQuality[1]
      array.push(data)
    })
    return array;
  }

  getEnergyLevelTrend(){
    console.log('getEnergyLevelTrend')
    let data =  {} as Item;
    let array= [];
    this.currentUserExerciseItems = this.datastoreService.getUserExerciseItemsList()
    $.each(this.currentUserExerciseItems, function(key, value) {
      if (value.exerciseEntry.date){data.name = value.exerciseEntry.date}else{data.name = 'TEMP'}  
      data.value = value.exerciseEntry.energyLevel[1]
      array.push(data)
    })
    return array
  }


  getUserLogTimesByType(type){
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

  correlateDataOption1(){
    this.appetiteData = this.getAppetiteTrend()
    this.generalMoodData = this.getGeneralMoodTrend()
    this.sleepQualityData = this.getSleepQualityTrend()
    this.energyLevelData = this.getEnergyLevelTrend()
  
    let data = {} as Item;
    let dataArray = {} as MultiItem;
    let array= [];

    dataArray.name = 'Appetite'
    dataArray.series = this.appetiteData
    array.push(dataArray)

    dataArray.name = 'General Mood'
    dataArray.series = this.generalMoodData
    array.push(dataArray)

    dataArray.name = 'Sleep Quality'
    dataArray.series = this.sleepQualityData
    array.push(dataArray)

    dataArray.name = 'Energy Level'
    dataArray.series = this.energyLevelData
    array.push(dataArray)

    return array
  }
}
