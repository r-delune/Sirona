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
import { Key } from 'protractor';

declare var jquery:any;
declare var $ :any;

export class Item {
  name: string;
  value: number;
  min : number;
  max :number;
}

export class Diet {
  alcoholDrank: string;
  appetite: number;
  confectionary :number;
  cupsOfCoffee :number;
  date :number;
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
  currentUserSleepItems
  appetiteData
  generalMoodData
  sleepQualityData 
  energyLevelData
  allUserDietLogs : Object
  allUserSleepLogs : Object
  allUserMoodLogs : Object

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
      var val = Math.round(value.moodEntry.generalMood);
      if (val == NaN){   
        console.log('Skipping ' + val)
      }else{
       let data =  {
        name: myDate,
        value: val
      }
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
    
    console.log(this.currentUserDietItems)

    $.each(this.currentUserDietItems, function(key, value) {
      var myDate = new Date(value.dietEntry.date);
      var val = Math.round(value.dietEntry.appetite);
      if (val == NaN){   
        console.log('Skipping ' + val)
      }else{
       let data =  {
        name: myDate,
        value: val
      }
        singleArray.push(data)
      } 
    })

    multiArray.name = 'Appetite Trend'
    multiArray.series = singleArray

    return {singleArray, multiArray};
  }

  
  getSleepTrends(){
    console.log('getSleepTrends')
    let singleArray= [];
    let multiArray = {} as MultiItem;

    var noOfHoursSlept = {
      name:'Hours Slept',
      series: []
    }

    var sleepQuality = {
      name:'Quality',
      series: []
    }

    var sleepDifficulty = {
      name:'Difficulty',
      series: []
    }

    this.currentUserSleepItems = this.datastoreService.getUserSleepItemsList()    
    console.log('this.currentUserSleepItems')
    console.log(this.currentUserSleepItems)

    $.each(this.currentUserSleepItems, function(key, value) {
      var myDate = new Date(value.sleepEntry.date);
      var year = myDate.getFullYear();
      var month = myDate.getMonth(); 
      var day = myDate.getUTCDate(); 
      //var date = day+'/'+month+'/'+year
      var date = myDate
      console.log(value.sleepEntry)

      if (value.sleepEntry.noOfHoursSlept){
        var noOfHoursSleptVal = Math.round(value.sleepEntry.noOfHoursSlept);

        console.log('noOfHoursSlept')
        console.log(noOfHoursSlept)
        if (!isNaN(noOfHoursSleptVal)){   
          noOfHoursSlept.series.push({name:date, value: noOfHoursSleptVal})       
        }else{
          console.log('Skipping noOfHoursSlept')
        }
      }

      if (value.sleepEntry.sleepQuality){
        var sleepQualityVal = Math.round(value.sleepEntry.sleepQuality);
        if (!isNaN(sleepQualityVal)){   
          sleepQuality.series.push({name:date, value: sleepQualityVal})       
        }else{
          console.log('Skipping concentrationLevelVal')
        }
      }

      if (value.sleepEntry.sleepDifficulty){
        var sleepDifficultyVal = Math.round(value.sleepEntry.sleepDifficulty);
        if (!isNaN(sleepDifficultyVal)){   
          sleepDifficulty.series.push({name:date, value: sleepDifficultyVal})       
        }else{
          console.log('Skipping sleepDifficulty')
        }
      }
     
    })
    
   // if(noOfHoursSlept.series.length >= 2 ){singleArray.push(noOfHoursSlept)}else{console.log('not enough hours slept data')}
   // if(sleepQuality.series.length >= 2 ){singleArray.push(sleepQuality)}else{console.log('not enough sleep quality data')}
    //if(sleepDifficulty.series.length >= 2 ){singleArray.push(sleepDifficulty)}else{console.log('not enough sleep difficulty slept data')}

    if(noOfHoursSlept.series.length){singleArray.push(noOfHoursSlept)}
    if(sleepQuality.series.length){singleArray.push(sleepQuality)}
    if(sleepDifficulty.series.length){singleArray.push(sleepDifficulty)}

    console.log('GET Sleep TRENDS')
      //if (singleArray.length <= 3){console.log('No Data Found'); return null}

      if (singleArray.length == 0){console.log('No Data Found'); return null}else{return singleArray;}
  }

  getMoodTrends(){
    console.log('getMoodTrend')
    let singleArray= [];
    let multiArray = {} as MultiItem;

    var anxietyLevel = {
      name:'Anxiety Level',
      series: []
    }

    var concentrationLevel = {
      name:'Concentration Level',
      series: []
    }

    var motivationLevel = {
      name:'Motivation Level',
      series: []
    }

    var generalMood = {
      name:'General Mood',
      series: []
    }

    var externalStress = {
      name:'External Stress',
      series: []
    }

    this.currentUserMoodItems = this.datastoreService.getUserMoodItemsList()
    
    console.log('this.currentUserMoodItems')
    console.log(this.currentUserMoodItems)

    $.each(this.currentUserMoodItems, function(key, value) {
      var myDate = new Date(value.moodEntry.date);
      var year = myDate.getFullYear();
      var month = myDate.getMonth(); 
      var day = myDate.getUTCDate(); 
      //var date = day+'/'+month+'/'+year
      var date = myDate

      if (value.moodEntry.anxietyLevel){
        var anxietyLevelVal = Math.round(value.moodEntry.anxietyLevel);

        console.log('anxietyLevelVal')
        console.log(anxietyLevelVal)
        if (!isNaN(anxietyLevelVal)){   
          anxietyLevel.series.push({name:date, value: anxietyLevelVal})       
        }else{
          console.log('Skipping anxietyLevelVal')
        }
      }

      if (value.moodEntry.concentrationLevel){
        var concentrationLevelVal = Math.round(value.moodEntry.concentrationLevel);
        if (!isNaN(concentrationLevelVal)){   
          concentrationLevel.series.push({name:date, value: concentrationLevelVal})       
        }else{
          console.log('Skipping concentrationLevelVal')
        }
      }
      if (value.moodEntry.motivationLevel){
        var motivationLevelVal = Math.round(value.moodEntry.motivationLevel);
        if (!isNaN(motivationLevelVal)){   
          motivationLevel.series.push({name:date, value: motivationLevelVal})       
        }else{
          console.log('Skipping motivationLevelVal')
        }
      }
      
      if (value.moodEntry.generalMood){
        var generalMoodVal = Math.round(value.moodEntry.generalMood);
        if (!isNaN(generalMoodVal)){   
          generalMood.series.push({name:date, value: generalMoodVal})       
        }else{
          console.log('Skipping generalMoodVal')
        }
      }

      if (value.moodEntry.externalStress){
        var externalStressVal = Math.round(value.moodEntry.extEffectOnMood);
        if (!isNaN(externalStressVal)){   
          externalStress.series.push({name:date, value: externalStressVal})       
        }else{
          console.log('Skipping externalStressVal')
        }
      }
    })

   // if(anxietyLevel.series.length  >= 2){singleArray.push(anxietyLevel)}else{console.log('not enough anxietyLevel data')}
   // if(concentrationLevel.series.length  >= 2){singleArray.push(concentrationLevel)}else{console.log('not enough concentrationLevel data')}
   // if(motivationLevel.series.length  >= 2){singleArray.push(motivationLevel)}else{console.log('not enough motivationLevel data')}
  //  if(generalMood.series.length  >= 2){singleArray.push(generalMood)}else{console.log('not enough generalMood data')}
  //  if(externalStress.series.length >= 2){singleArray.push(externalStress)}else{console.log('not enough externalStress data')}

    if(anxietyLevel.series.length){singleArray.push(anxietyLevel)}
    if(concentrationLevel.series.length ){singleArray.push(concentrationLevel)}
    if(motivationLevel.series.length ){singleArray.push(motivationLevel)}
    if(generalMood.series.length ){singleArray.push(generalMood)}
    if(externalStress.series.length){singleArray.push(externalStress)}


    console.log('GET Mood TRENDS')
    if (singleArray.length == 0){console.log('No Data Found'); return null}else{return singleArray;}


    
  }

  getDietTrends(){
    console.log('getDietTrend')
    let singleArray= [];
    let multiArray = {} as MultiItem;

    var appetite = {
      name:'Appetite',
      series: []
    }

    var cupsOfCoffee = {
      name:'Cups of Coffee',
      series: []
    }

    var alcoholDrank = {
      name:'Alcohol Intake',
      series: []
    }

    var kmRan = {
      name:'Km Ran',
      series: []
    }

    var kmWalked = {
      name:'Km Walked',
      series: []
    }

    var kmCycled = {
      name:'Km Cycled',
      series: []
    }

    this.currentUserDietItems = this.datastoreService.getUserDietItemsList()
    
    console.log('this.currentUserDietItems')
    console.log(this.currentUserDietItems)

    $.each(this.currentUserDietItems, function(key, value) {
      var myDate = new Date(value.dietEntry.date);
      var year = myDate.getFullYear();
      var month = myDate.getMonth(); 
      var day = myDate.getUTCDate(); 
      //var date = day+'/'+month+'/'+year
      var date = myDate

      if (value.dietEntry.anxietyLevel){
        var appetiteVal = Math.round(value.dietEntry.appetite);

        console.log('appetiteVal')
        console.log(appetiteVal)
        if (!isNaN(appetiteVal)){   
          appetite.series.push({name:date, value: appetiteVal})       
        }else{
          console.log('Skipping appetiteVal')
        }
      }

      if (value.dietEntry.cupsOfCoffee){
        var cupsOfCoffeeVal = Math.round(value.dietEntry.cupsOfCoffee);
        if (!isNaN(cupsOfCoffeeVal)){   
          cupsOfCoffee.series.push({name:date, value: cupsOfCoffeeVal})       
        }else{
          console.log('Skipping cupsOfCoffeeVal')
        }
      }
      
      if (value.dietEntry.alcoholDrank){
        var alcoholDrankVal = Math.round(value.dietEntry.alcoholDrank);
        if (!isNaN(alcoholDrankVal)){   
          alcoholDrank.series.push({name:date, value: alcoholDrankVal})       
        }else{
          console.log('Skipping alcoholDrankVal')
        }
      }

      if (value.dietEntry.kmRan){
        var kmRanVal = Math.round(value.dietEntry.kmRan);
        if (!isNaN(kmRanVal)){   
          kmRan.series.push({name:date, value: kmRanVal})       
        }else{
          console.log('Skipping kmRan')
        }
      }

      if (value.dietEntry.kmWalked){
        var kmWalkedVal = Math.round(value.dietEntry.kmWalked);
        if (!isNaN(kmWalkedVal)){   
          kmWalked.series.push({name:date, value: kmRanVal})       
        }else{
          console.log('Skipping kmWalked')
        }
      }

      if (value.dietEntry.kmCycled){
        var kmCycledVal = Math.round(value.dietEntry.kmCycled);
        if (!isNaN(kmCycledVal)){   
          kmCycled.series.push({name:date, value: kmCycledVal})       
        }else{
          console.log('Skipping kmCycledVal')
        }
      }
    })

  //  if(appetite.series.length >= 2){singleArray.push(appetite)}else{console.log('not enough appetite data')}
  //  if(cupsOfCoffee.series.length >= 2){singleArray.push(cupsOfCoffee)}else{console.log('not enough cupsOfCoffee data')}
  //  if(alcoholDrank.series.length >= 2){singleArray.push(alcoholDrank)}else{console.log('not enough alcoholDrank data')}
  //  if(kmRan.series.length >= 2){singleArray.push(kmRan)}else{console.log('not enough kmRan data')}
  //  if(kmWalked.series.length >= 2){singleArray.push(kmWalked)}else{console.log('not enough kmWalked data')}
   // if(kmCycled.series.length >= 2){singleArray.push(kmCycled)}else{console.log('not enough kmCycled data')}
   // console.log('GET DIET TRENDS')  
  //  if (singleArray.length == 0){console.log('No Data Found'); return null}else{return singleArray;}

    if(appetite.series.length){singleArray.push(appetite)}
    if(cupsOfCoffee.series.length){singleArray.push(cupsOfCoffee)}
    if(alcoholDrank.series.length){singleArray.push(alcoholDrank)}
    if(kmRan.series.length){singleArray.push(kmRan)}
    if(kmWalked.series.length){singleArray.push(kmWalked)}
    if(kmCycled.series.length){singleArray.push(kmCycled)}
    console.log('GET DIET TRENDS')  
    if (singleArray.length == 0){console.log('No Data Found'); return null}else{return singleArray;}
  }

  //CHANGE: GETTREND SHOULD BE CONSOLIDATED TO ONE FUNCTION

  countUserTotalEntries(){
    let allUserEntries = this.datastoreService.getAllCurrentUserLogItems()
    var count = 0;
    console.log('getting total user entries')

    $.each(allUserEntries, function(key, value) {
      for(var prop in value) {
        ++count;
      }
    })
    return count
  }

  getSleepQualityTrend(){
    console.log('getSleepQualityTrend')

    let singleArray= [];
    let multiArray = {} as MultiItem;
    this.currentUserSleepItems = this.datastoreService.getUserSleepItemsList()
    $.each(this.currentUserSleepItems, function(key, value) {
      var myDate = new Date(value.sleepEntry.date);
      var val = Math.round(value.sleepEntry.sleepQuality);
      if (val == NaN){   
        console.log('Skipping ' + val)
      }else{
       let data =  {
        name: myDate,
        value: val
      }
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

  //CHANGE: REMOVE JQUERY AS IT IS UNNECCESARY

  getUserLogFrequency(type){

    this.type = type
    console.log('getting user log frequency for - ' + this.type)

    if (this.type == 'Diet'){
      this.logItems = this.datastoreService.getUserDietItemsList()
    }else if (this.type == 'Sleep'){
      this.logItems = this.datastoreService.getUserSleepItemsList()
      console.log(this.logItems)
      console.log(this.logItems.length)
    }else if (this.type == 'Mood'){
      this.logItems = this.datastoreService.getUserMoodItemsList()
    }

    //SHOULD START AT 0
    var morningLogCount = 0
    var afternoonLogCount = 0
    var eveningLogCount = 0
    var nightLogCount = 0

    $.each(this.logItems, function(key, value) {
      
      if (this.type == 'Diet'){
        var myDate = new Date(value.dietEntry.date);
      }else if (this.type == 'Sleep'){
        var myDate = new Date(value.sleepEntry.date);      
      }else if (this.type == 'Mood'){
        var myDate = new Date(value.moodEntry.date);     
      }

      var minutes = myDate.getMinutes();
      var hours = myDate.getHours();      

      console.log('TME')
      console.log(minutes)
      console.log(hours)

      if (hours > 6 && hours < 12){
        this.morningLogCount++
        console.log('adding ' + this.morningLogCount)
      }else if (hours > 12 && hours < 17){
        this.afternoonCount++
        console.log('adding ' + this.afternoonCount)
      }else if (hours > 17 && hours < 21){
        this.eveningCount++
        console.log('adding ' + this.eveningCount)
      }else if (hours > 21 || hours < 6){
        console.log(this.nightCount)
        this.nightCount++
        console.log('adding ' + this.nightCount)
      }
    });

    var data1 = [
      { "name": "Morning", "value": this.morningLogCount},
      { "name": "Afternoon","value": this.afternoonLogCount},
      { "name": "Evening", "value": this.eveningLogCount },
      { "name": "Night", "value": this.nightLogCount }
    ];


   // if (this.morningLogCount == 0 && this.afternoonLogCount == 0 && this.eveningLogCount == 0 && this.nightLogCount == 0){
   //   console.log('No data found - returning null')
   //   return null
   // }

    var data2 = [
      { "name": "Morning","series" : [{ "name": "Morning","value": this.morningLogCount},{ "name": "Morning","value": this.morningLogCount}]},
      { "name": "Afternoon", "series" : [{"name": "Afternoon", "value": this.afternoonLogCount},{ "name": "Afternoon", "value": this.afternoonLogCount}]},
      { "name": "Evening","series" : [{"name": "Evening", "value": this.eveningLogCount},{ "name": "Evening", "value": this.eveningLogCount}]},
      { "name": "Night","series" : [{"name": "Night", "value": this.nightLogCount},{ "name": "Night", "value": this.nightLogCount}]}
    ];  
    return {data1, data2}
  }

  getUserLogInstancesByType(type){

    var array = this.getAllUserLogInstances()
    var instanceArray

    $.each(array.data1, function(key, value) {
      if (value.name == type){
        console.log('Testing to see if array is populated with useful data')
        console.log(value.value)
        if (value.value <= 2){
          console.log('Not enough entries - returning null'); 
          return null
        }else{
          $.each(array.data2, function(key, value) {
            if (value.name == type){
              console.log('Adding data to array')
              console.log(key)
              console.log(value)
              instanceArray = value.series
             // instanceArray.push(value)
            // return value.series
            }
          })

         console.log('getting all user log times for - ' + type)
         console.log('Returning' + instanceArray)
          console.log(instanceArray)
          return instanceArray
        }
      }
      console.log('Returning' + instanceArray)
      console.log(instanceArray)
      return instanceArray
    })

    console.log('Returning' + instanceArray)
    console.log(instanceArray)
    return instanceArray
  }

  getAllUserLogInstances(){

    var singleArray = []
    var multiArray = []

    console.log('getting all user log times')

      var dietItemList = this.datastoreService.getUserDietItemsList()
      var appetiteLevelCount = 0
      var cupsOfCoffeeCount = 0
      var alcoholDrankCount = 0
      var kmRanCount = 0
      var kmWalkedCount = 0
      var kmCycledCount = 0
      var totalDietCount= 0
   
      var sleepItemList = this.datastoreService.getUserSleepItemsList()
      var sleepQualityCount = 0
      var sleepDifficultyCount = 0
      var noOfHoursSleptCount = 0
      var totalSleepCount= 0
   
      var moodItemList = this.datastoreService.getUserMoodItemsList()
      var generalMoodCount = 0
      var energyLevelCount = 0
      var motivationLevelCount = 0
      var concentrationLevelCount = 0
      var anxietyLevelCount = 0
      var totalMoodCount = 0

    $.each(dietItemList, function(key, value) {
        var dietArray = value.dietEntry
        console.log('value')
        console.log(value)
        $.each(dietArray, function(key, value) {
          if (key != null){
            totalDietCount++
            if (key == 'appetiteLevel' && value != null){appetiteLevelCount++}
            if (key == 'cupsOfCoffee' && value != null){cupsOfCoffeeCount++}
            if (key == 'alcoholDrank' && value != null){alcoholDrankCount++}
            if (key == 'kmRan' && value != null){kmRanCount++}
            if (key == 'kmWalked' && value != null){kmWalkedCount++}
            if (key == 'kmCycled' && value != null){kmCycledCount++}
          }
        });
      });

      $.each(sleepItemList, function(key, value) {
        var sleepArray = value.sleepEntry
        var sleepQuality = value.sleepEntry.sleepQuality;
        var sleepDifficulty = value.sleepEntry.sleepDifficulty;
        var noOfHoursSlept = value.sleepEntry.noOfHoursSlept;
        $.each(sleepArray, function(key, value) {
          if (key != null){
            totalSleepCount++
            if (key == 'sleepQuality' && value != null){sleepQualityCount++}
            if (key == 'sleepDifficulty' && value != null){sleepDifficultyCount++}
            if (key == 'noOfHoursSlept' && value != null){noOfHoursSleptCount++}
          }
        });
      });

      $.each(moodItemList, function(key, value) {
        var moodArray = value.moodEntry
        var generalMood = value.moodEntry.generalMood;
        var energyLevel = value.moodEntry.energyLevel;
        var motivationLevel = value.moodEntry.motivationLevel;
        var concentrationLevel = value.moodEntry.concentrationLevel;
        var anxietyLevel = value.moodEntry.anxietyLevel;
        
        $.each(moodArray, function(key, value) {      
          if (key != null){
            totalMoodCount++
            if (key == 'generalMood'){generalMoodCount++}
            if (key == 'energyLevel'){energyLevelCount++}
            if (key == 'motivationLevel'){motivationLevelCount++}
            if (key == 'concentrationLevel'){anxietyLevelCount++}
            if (key == 'anxietyLevel'){anxietyLevelCount++}
          }
        });
    });
    
    var data1 = [
      { "name": "Mood", "value": totalMoodCount},
      { "name": "Sleep","value": totalSleepCount},
      { "name": "Diet/Exercise", "value": totalDietCount},
    ];

   // if (totalMoodCount == 0 && totalSleepCount == 0 && totalDietCount == 0){
   //   console.log('No data found - returning null')
   //   return null
   // }

    var data2 = [
      { "name": "Mood","series" : 
        [
          { "name": "General Mood","value": generalMoodCount},
          { "name": "Energy Level","value": energyLevelCount},
          { "name": "Motivation","value": motivationLevelCount},
          { "name": "Concentration","value": concentrationLevelCount},
          { "name": "Anxiety","value": anxietyLevelCount}
        ]
      },
      { "name": "Sleep", "series" : 
        [
          { "name": "Sleep Quality", "value": sleepQualityCount},
          { "name": "Sleep Difficulty", "value": sleepDifficultyCount},
          { "name": "Hours Slept", "value": noOfHoursSleptCount},
        ]
      },
      { "name": "Diet/Exercise","series" : 
        [
          { "name": "Appetite", "value": appetiteLevelCount},
          { "name": "Alcohol Intake", "value": alcoholDrankCount},
          { "name": "Km Ran", "value": kmRanCount},
          { "name": "Km Walked", "value": kmWalkedCount},
          { "name": "Km Cycled", "value": kmCycledCount}
        ]
      },
    ]; 


    return {data1, data2}
  }


  getUserLogTimesByType(type){

    //CHANGE: CURRENTLY UNUSED

    this.type = type
    console.log('getting user log times for - ' + this.type)

    if (this.type == 'Diet'){
      this.logItems = this.datastoreService.getUserDietItemsList()
    }else if (this.type == 'Sleep'){
      this.logItems = this.datastoreService.getUserSleepItemsList()
    }else if (this.type == 'Mood'){
      this.logItems = this.datastoreService.getUserMoodItemsList()
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

    console.log(this.sleepQualityData.singleArray.length)

    if (this.sleepQualityData.singleArray.length <= 3 && this.generalMoodData.singleArray.length <= 3 && this.appetiteData.singleArray.length <= 3 && this.sleepQualityData.singleArray.length <= 3){
      console.log('Correlation array is less than 2 - returning');
      return null
    }

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

  getAllUserLogCountData(){

    console.log('getting all user log count data')

    this.allUserDietLogs = this.datastoreService.getUserDietItemsList()
    this.allUserSleepLogs = this.datastoreService.getUserSleepItemsList()
    this.allUserMoodLogs = this.datastoreService.getUserMoodItemsList()
    
    var dietLogCount = 0;
    var MoodLogCount = 0;
    var SleepLogCount = 0;
    var TotalLogCount = dietLogCount + MoodLogCount + SleepLogCount;

    for (var k in this.allUserDietLogs){
      dietLogCount++
    };
    for (var k in this.allUserSleepLogs){
      SleepLogCount++
    };
    for (var k in this.allUserMoodLogs){
      MoodLogCount++
    };

    var data1 = [
      { "name": "Mood", "value": MoodLogCount},
      { "name": "Sleep","value": SleepLogCount},
      { "name": "Diet/Exercise", "value": dietLogCount},
    ];
    
    var data2 = [
      { "name": "Mood", "series" : [{ "name": "Mood","value": MoodLogCount},{ "name": "Mood","value": MoodLogCount}]},
      { "name": "Sleep", "series" : [{"name": "Sleep", "value": SleepLogCount},{ "name": "Sleep", "value": SleepLogCount}]},
      { "name": "Diet", "series" : [{"name": "Diet", "value": dietLogCount},{ "name": "Diet", "value": dietLogCount}]},
    ]; 

    return {data1, data2}
  }

  truncateDate(date){
    var myDate = new Date(date);
    var year = myDate.getFullYear();
    var month = myDate.getMonth(); 
    var day = myDate.getUTCDate(); 
    var truncatedDate = day+'/'+month+'/'+year

    return truncatedDate
  }

}
