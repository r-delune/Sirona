import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
//import {single, multi} from '../data';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataInterpretorService} from '../services/data-interpretor.service'

declare var jquery:any;
declare var $ :any;
//export class mySingle {
//  morning: number;
///  afternoon: number; 
//  evening: number;
///  night: number; 
//}

  // this.timeOfEntryGraph({"name" : "Morning" , "value" : this.morningCount})

  export class mySingle {
    name: string;
    value: number
  }

export class myMulti {
  name: string;
  series: [
    {
      name: string,  
      value: number
    },
    {
      name: string,  
      value: number
    },
    {
      name: string,  
      value: number
    },
    {
      name: string,  
      value: number
    }
  ] 
}


@Component({
  selector: 'app-user-graph-diet',
  templateUrl: './user-graph-diet.component.html',
  styleUrls: ['./user-graph-diet.component.css']
})




export class UserGraphDietComponent  {

  translation: string;
  outerRadius: number;
  innerRadius: number;
 data: any;
 data2: any;
  domain: any;
  dims: any;
  margin = [20, 20, 20, 20];
  legendOptions: any;

  logItems
  currentUserLogItems

  entryDates = []
  noOfEntrys

  single: any[];
  multi: any[];
 
  //data: Object[] = [];
  
  view: any[] = [1700, 1400];
  showLegend = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  itemRef
  logItemsList

  timeOfEntryGraphLegend
  timeOfEntryGraph
  morningCount
  afternoonCount
  eveningCount 
  nightCount 

  timeOfDayArray = []
  myDate
  minutes
  hours

  timeOfDayArrayList: any[];
  timeOfDayArrayListMulti: any[];
  totalData
  data1

  constructor(authService: AuthService,
    private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

      this.currentUserLogItems = datastoreService.allUserItems
      this.totalData = this.dataInterpretorService.getUserLogTimesByType('Diet')
      this.data1 = this.totalData.data1
      this.data2 = this.totalData.data2

      //Object.assign(this, {data, data2})   
    }
  

     // console.log('In dietary mode!')
    //CHANGE SLIDER TO SINGLE,
    //CHANGE DATE TO TIMEOFeNTRY
    //DATE SHOULD BE 24HR
   //THIS SHOULD BE A SEPERATE FUNCTION
  
  onSelect(event) {
    console.log(event);
  }

  ngOnInit(){

/*
    this.logItems = this.datastoreService.getUserDietItemsList()
    console.log('FINAL ARRAY')
    console.log(this.logItems)
    this.morningCount = 10
    this.afternoonCount = 10
    this.eveningCount = 10
    this.nightCount = 10

    $.each(this.logItems, function(key, value) {
      var myDate = new Date(value.dietEntry.date);
      var minutes = myDate.getMinutes();
      var hours = myDate.getHours();

      console.log('HOURS');
      console.log(hours);

      if (hours > 6 && hours < 12){
        this.morningCount = this.morningCount+1
        console.log('adding ' + this.morningCount)
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



    var data = [
      { "name": "Morning", "value": this.morningCount },
      { "name": "Afternoon", "value": this.afternoonCount },
      { "name": "Evening", "value": this.eveningCount },
      { "name": "Night", "value": this.nightCount }
    ];


    var data2 = [
      { name: "Morning", series : [{ "name": "Afternoon", "value": this.morningCount },{ "name": "Afternoon", "value": this.morningCount }] },
      { name: "Afternoon", series : [{ "name": "Afternoon", "value": this.afternoonCount },{ "name": "Afternoon", "value": this.afternoonCount }] },
      { name: "Evening", series : [{ "name": "Evening", "value": this.eveningCount },{ "name": "Evening", "value": this.eveningCount }] },
      { name: "Night", series : [{ "name": "Night", "value": this.nightCount },{ "name": "Night", "value": this.nightCount }] },
    ];

    console.log(single)
    console.log(multi)
   // console.log('timeOfDayArrayList')
   // console.log(timeOfDayArrayList)
   // console.log('timeOfDayArrayListMulti')
   // console.log(timeOfDayArrayListMulti)
    Object.assign(this, single, multi)*/
  }
}
