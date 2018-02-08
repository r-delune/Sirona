import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app'; 
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import { DatastoreService } from '../services/datastore.service';

declare var jquery:any;
declare var $ :any;

export class Item {
  name: string;
  value: number;
  min : number;
  max :number;
}

export class MultiItem {
  name: string;
  series: any
}

//fi
export class MultiItem2 {
  name: string;
  series: Array<Item>
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
    let singleArray= [];
    let multiArray = {} as MultiItem;
    this.currentUserMoodItems = this.datastoreService.getUserMoodItemsList()
    $.each(this.currentUserMoodItems, function(key, value) { 
      var myDate = new Date(value.moodEntry.date);
      var year = myDate.getFullYear();
      var month = myDate.getMonth(); 
      var day = myDate.getUTCDate(); 
      var date = day+'/'+month+'/'+year
      if (date){data.name = date}else{data.name = 'TEMP'}  
      data.value = Math.round(value.moodEntry.generalMood[1]);
      if (data.value == NaN){   
        console.log('Skipping ' + data.name)
        console.log(data.value) 
      }else{
        data.min = 0
        data.max = 100
        singleArray.push(data)
      }
    })

    multiArray.name = 'General Mood'
    multiArray.series = singleArray

    return {singleArray, multiArray};
  }

  //CHANGE: RENAME GRAPH CLASSES + ADD TO FOLDERS

  getAppetiteTrend(){
    console.log('getAppetiteTrend')
    let data =  {} as Item;
    let singleArray= [];
    let multiArray = {} as MultiItem;
    this.currentUserDietItems = this.datastoreService.getUserDietItemsList()
    
    $.each(this.currentUserDietItems, function(key, value) {
      var myDate = new Date(value.dietEntry.date);
      var year = myDate.getFullYear();
      var month = myDate.getMonth(); 
      var day = myDate.getUTCDate(); 
      var date = day+'/'+month+'/'+year
      if (date){data.name = date}else{data.name = 'TEMP'}  
      //data.value = value.dietEntry.appetite[1]
      //TEMPORARY 
      data.value = Math.round(value.dietEntry.appetite[1]);
      if (data.value == NaN){   
        console.log('Skipping ' + data.name)
        console.log(data.value) 
      }else{
        data.min = 0
        data.max = 100
        singleArray.push(data)
      }
    })

    multiArray.name = 'Appetite Trend'
    multiArray.series = singleArray

    return {singleArray, multiArray};
  }

  //CHANGE: GETTREND SHOULD BE CONSOLIDATED TO ONE FUNCTION

  countUserTotalEntries(){
    let allUserEntries = this.datastoreService.getAllCurrentUserLogItems()
    var count = 0;

    $.each(allUserEntries, function(key, value) {
      for(var prop in value) {
        ++count;
      }
    })
    return count
  }

  getSleepQualityTrend(){
    console.log('getSleepQualityTrend')
    let data =  {} as Item;
    let singleArray= [];
    let multiArray = {} as MultiItem;
    this.currentUserSleepItems = this.datastoreService.getUserSleepItemsList()
    $.each(this.currentUserSleepItems, function(key, value) {
      var myDate = new Date(value.sleepEntry.date);
      var year = myDate.getFullYear();
      var month = myDate.getMonth(); 
      var day = myDate.getUTCDate(); 
      var date = day+'/'+month+'/'+year
      if (date){data.name = date}else{data.name = 'TEMP'}  
      //data.value = value.sleepEntry.sleepQuality[1]
      data.value = Math.round(value.sleepEntry.sleepQuality[1]);
      if (data.value == NaN){   
        console.log('Skipping ' + data.name)
        console.log(data.value) 
      }else{
        data.min = 0
        data.max = 100
        singleArray.push(data)
      }  
    })

    multiArray.name = 'Sleep Trends'
    multiArray.series = singleArray

    return {singleArray, multiArray};
  }

  //CHANGE: ALLOW FOR THIS FUNCTION TO BE USED INSIDE OTHERS
  shortenTimeStamp(fullDateTime){
    var myDate = new Date(fullDateTime);
    var year = myDate.getFullYear();
    var month = myDate.getMonth(); 
    var date = myDate.getUTCDate(); 
    var dateOnly = date+'/'+month+'/'+year
    return dateOnly
  }

  getEnergyLevelTrend(){
    console.log('getEnergyLevelTrend')
    let data =  {} as Item;
    let singleArray= [];
    let multiArray = {} as MultiItem;
    this.currentUserExerciseItems = this.datastoreService.getUserExerciseItemsList()
    $.each(this.currentUserExerciseItems, function(key, value) {
        var myDate = new Date(value.exerciseEntry.date);
        var year = myDate.getFullYear();
        var month = myDate.getMonth(); 
        var day = myDate.getUTCDate(); 
        var date = day+'/'+month+'/'+year
        if (date){data.name = date}else{data.name = 'TEMP'}  
        //data.value = value.exerciseEntry.energyLevel[1]
        //CHANGE - ENERGY LEVEL SHOULD BE PART OF EXERCISE DATA, AS STAMINA
        data.value = Math.round(value.exerciseEntry.kmRan[1]);
        if (data.value == NaN){   
          console.log('Skipping ' + data.name)
          console.log(data.value) 
        }else{
          data.min = 0
          data.max = 100
          singleArray.push(data)
        }
    })

    multiArray.name = 'Energy Level trends'
    multiArray.series = singleArray

    return {singleArray, multiArray};
  }

  //CHANGE: REMOVE JQUERY AS IT IS UNNECCESARY

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
      //CHANGE: very inefficient. considering changing data model i.i removing sleepEntry node
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

  //CHANGE 404 PAGE, RELINK TO GRAPH
  //CHANGE: THESE FUNCTIONS SHEOULD BE PART OF TREND FUNCT

  correlateDataOption1(){
    this.appetiteData = this.getAppetiteTrend()
    this.generalMoodData = this.getGeneralMoodTrend()
    this.sleepQualityData = this.getSleepQualityTrend()
    this.energyLevelData = this.getEnergyLevelTrend()
    
 
    let data = {} as Item;
    let appetiteDataArray = {} as MultiItem;
    let generalMoodDataArray = {} as MultiItem;
    let sleepQualityArray = {} as MultiItem;
    let energyLevelArray = {} as MultiItem;
    let array= [];

    //CHANGE: DATA TO BE GROUPED BY EXACT DATE, MAYBE FILTER BY TIME OF DAY

    console.log(this.appetiteData)
    console.log(this.generalMoodData)
    console.log(this.sleepQualityData)
    console.log(this.energyLevelData)

    appetiteDataArray.name = 'Appetite'
    appetiteDataArray.series = this.appetiteData.singleArray
    array.push(appetiteDataArray)

    generalMoodDataArray.name = 'General Mood'
    generalMoodDataArray.series = this.generalMoodData.singleArray
    array.push(generalMoodDataArray)
   //CHANGE: ADD TO ARRAYS DYNAMICALLY
    sleepQualityArray.name = 'Sleep Quality'
    sleepQualityArray.series = this.sleepQualityData.singleArray
    array.push(sleepQualityArray)

    energyLevelArray.name = 'Energy Level'
    energyLevelArray.series = this.energyLevelData.singleArray
    array.push(energyLevelArray)

    console.log('correlationArray')
    console.log(array)

    return array
  }

  //CHANGE TRUNCATE DATE IN DISPLAY

  validateIsNumber(value){
    var num = Math.round(value);
    if (num == NaN){   
      return false
    }else{
      return num
    }
  }
}
