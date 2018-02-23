import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../data';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DataInterpretorService} from '../services/data-interpretor.service'

@Component({
  selector: 'app-user-graph-mood',
  templateUrl: './user-graph-mood.component.html',
  styleUrls: ['./user-graph-mood.component.css']
})
export class UserGraphMoodComponent  {
  logItems
  currentUserLogItems

  single: any[];
  multi: any[];
  view: any[] = [800, 450];

  showLegend = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // pie
  showLabels = true;
  explodeSlices = true;
  doughnut = false;
  totalData
  data1
  data
  data2: any[];
  generalMoodData
  tooltipDisabled=true
  constructor(authService: AuthService,
    private dataInterpretorService: DataInterpretorService) { 
     // this.totalData = this.dataInterpretorService.getUserLogInstancesByType('Mood')
     // console.log('getUserLogTimesByType')
     // this.data = this.totalData.data1
      //console.log(this.data)


      this.data = this.dataInterpretorService.getUserLogInstancesByType('Mood') 
      console.log('appetiteData data')
      console.log(this.data)
     // this.data2 = this.totalData.data2
  }
  
  onSelect(event) {
    console.log(event);
  }

  ngOnInit(){
  
  }
}
