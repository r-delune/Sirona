import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataInterpretorService} from '../services/data-interpretor.service'

declare var jquery:any;
declare var $ :any;

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
  appetiteData
  tooltipDisabled=true
  constructor(authService: AuthService,
    private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 
      this.currentUserLogItems = datastoreService.allUserItems
      this.totalData = this.dataInterpretorService.getUserLogTimesByType('Diet')
      this.data = this.totalData.data1
      
      console.log('appetiteData time data')
      console.log(this.data)
      console.log(this.data.series)
    }

  //CHANGE SLIDER TO SINGLE,
  //CHANGE DATE TO TIMEOFeNTRY
  //DATE SHOULD BE 24HR
  //THIS SHOULD BE A SEPERATE FUNCTION
  
  onSelect(event) {
    console.log(event);
  }
}
