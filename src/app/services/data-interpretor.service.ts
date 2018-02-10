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
      var val = Math.round(value.moodEntry.generalMood[1]);
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
    
    $.each(this.currentUserDietItems, function(key, value) {
      var myDate = new Date(value.dietEntry.date);
      var val = Math.round(value.dietEntry.appetite[1]);
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
        var noOfHoursSleptVal = Math.round(value.sleepEntry.noOfHoursSlept[1]);

        console.log('noOfHoursSlept')
        console.log(noOfHoursSlept)
        if (!isNaN(noOfHoursSleptVal)){   
          noOfHoursSlept.series.push({name:date, value: noOfHoursSleptVal})       
        }else{
          console.log('Skipping noOfHoursSlept')
        }
      }

      if (value.sleepEntry.sleepQuality){
        var sleepQualityVal = Math.round(value.sleepEntry.sleepQuality[1]);
        if (!isNaN(sleepQualityVal)){   
          sleepQuality.series.push({name:date, value: sleepQualityVal})       
        }else{
          console.log('Skipping concentrationLevelVal')
        }
      }

      if (value.sleepEntry.sleepDifficulty){
        var sleepDifficultyVal = Math.round(value.sleepEntry.sleepDifficulty[1]);
        if (!isNaN(sleepDifficultyVal)){   
          sleepDifficulty.series.push({name:date, value: sleepDifficultyVal})       
        }else{
          console.log('Skipping sleepDifficulty')
        }
      }
     
    })
    
    if(noOfHoursSlept.series.length){singleArray.push(noOfHoursSlept)}
    if(sleepQuality.series.length){singleArray.push(sleepQuality)}
    if(sleepDifficulty.series.length){singleArray.push(sleepDifficulty)}
    return singleArray;
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
        var anxietyLevelVal = Math.round(value.moodEntry.anxietyLevel[1]);

        console.log('anxietyLevelVal')
        console.log(anxietyLevelVal)
        if (!isNaN(anxietyLevelVal)){   
          anxietyLevel.series.push({name:date, value: anxietyLevelVal})       
        }else{
          console.log('Skipping anxietyLevelVal')
        }
      }

      if (value.moodEntry.concentrationLevel){
        var concentrationLevelVal = Math.round(value.moodEntry.concentrationLevel[1]);
        if (!isNaN(concentrationLevelVal)){   
          concentrationLevel.series.push({name:date, value: concentrationLevelVal})       
        }else{
          console.log('Skipping concentrationLevelVal')
        }
      }
      if (value.moodEntry.motivationLevel){
        var motivationLevelVal = Math.round(value.moodEntry.motivationLevel[1]);
        if (!isNaN(motivationLevelVal)){   
          motivationLevel.series.push({name:date, value: motivationLevelVal})       
        }else{
          console.log('Skipping motivationLevelVal')
        }
      }
      
      if (value.moodEntry.generalMood){
        var generalMoodVal = Math.round(value.moodEntry.generalMood[1]);
        if (!isNaN(generalMoodVal)){   
          generalMood.series.push({name:date, value: generalMoodVal})       
        }else{
          console.log('Skipping generalMoodVal')
        }
      }

      if (value.moodEntry.externalStress){
        var externalStressVal = Math.round(value.moodEntry.extEffectOnMood[1]);
        if (!isNaN(externalStressVal)){   
          externalStress.series.push({name:date, value: externalStressVal})       
        }else{
          console.log('Skipping externalStressVal')
        }
      }
    })
    console.log(anxietyLevel)
    console.log(anxietyLevel.series.length)
    console.log(externalStress)
    console.log(externalStress.series.length)

    if(anxietyLevel.series.length){singleArray.push(anxietyLevel)}
    if(concentrationLevel.series.length){singleArray.push(concentrationLevel)}
    if(motivationLevel.series.length){singleArray.push(motivationLevel)}
    if(generalMood.series.length){singleArray.push(generalMood)}
    if(externalStress.series.length){singleArray.push(externalStress)}
    return singleArray;
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
      name:'Cups of Coffe',
      series: []
    }

    var confectionary = {
      name:'Confectionary Intake',
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
        var appetiteVal = Math.round(value.dietEntry.appetite[1]);

        console.log('appetiteVal')
        console.log(appetiteVal)
        if (!isNaN(appetiteVal)){   
          appetite.series.push({name:date, value: appetiteVal})       
        }else{
          console.log('Skipping appetiteVal')
        }
      }

      if (value.dietEntry.cupsOfCoffee){
        var cupsOfCoffeeVal = Math.round(value.dietEntry.cupsOfCoffee[1]);
        if (!isNaN(cupsOfCoffeeVal)){   
          cupsOfCoffee.series.push({name:date, value: cupsOfCoffeeVal})       
        }else{
          console.log('Skipping cupsOfCoffeeVal')
        }
      }
      if (value.dietEntry.confectionary){
        var confectionaryVal = Math.round(value.dietEntry.confectionary[1]);
        if (!isNaN(confectionaryVal)){   
          confectionary.series.push({name:date, value: confectionaryVal})       
        }else{
          console.log('Skipping confectionaryVal')
        }
      }
      
      if (value.dietEntry.alcoholDrank){
        var alcoholDrankVal = Math.round(value.dietEntry.alcoholDrank[1]);
        if (!isNaN(alcoholDrankVal)){   
          alcoholDrank.series.push({name:date, value: alcoholDrankVal})       
        }else{
          console.log('Skipping alcoholDrankVal')
        }
      }

      if (value.dietEntry.kmRan){
        var kmRanVal = Math.round(value.dietEntry.kmRan[1]);
        if (!isNaN(kmRanVal)){   
          kmRan.series.push({name:date, value: kmRanVal})       
        }else{
          console.log('Skipping kmRan')
        }
      }

      if (value.dietEntry.kmWalked){
        var kmWalkedVal = Math.round(value.dietEntry.kmWalked[1]);
        if (!isNaN(kmWalkedVal)){   
          kmWalked.series.push({name:date, value: kmRanVal})       
        }else{
          console.log('Skipping kmWalked')
        }
      }

      if (value.dietEntry.kmCycled){
        var kmCycledVal = Math.round(value.dietEntry.kmCycled[1]);
        if (!isNaN(kmCycledVal)){   
          kmCycled.series.push({name:date, value: kmCycledVal})       
        }else{
          console.log('Skipping kmCycledVal')
        }
      }
    })

    if(appetite.series.length){singleArray.push(appetite)}
    if(cupsOfCoffee.series.length){singleArray.push(cupsOfCoffee)}
    if(confectionary.series.length){singleArray.push(confectionary)}
    if(alcoholDrank.series.length){singleArray.push(alcoholDrank)}
    if(kmRan.series.length){singleArray.push(kmRan)}
    if(kmWalked.series.length){singleArray.push(kmWalked)}
    if(kmCycled.series.length){singleArray.push(kmCycled)}
    return singleArray;
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

    let singleArray= [];
    let multiArray = {} as MultiItem;
    this.currentUserSleepItems = this.datastoreService.getUserSleepItemsList()
    $.each(this.currentUserSleepItems, function(key, value) {
      var myDate = new Date(value.sleepEntry.date);
      var val = Math.round(value.sleepEntry.sleepQuality[1]);
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

  getEnergyLevelTrend(){
    console.log('getEnergyLevelTrend')
    let data =  {} as Item;
    let singleArray= [];
    let multiArray = {} as MultiItem;
    this.currentUserExerciseItems = this.datastoreService.getUserExerciseItemsList()
    $.each(this.currentUserExerciseItems, function(key, value) {
      var myDate = new Date(value.moodEntry.date);
      var val = Math.round(value.moodEntry.energyLevel[1]);
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

    multiArray.name = 'Energy Level'
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
