import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../data';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DataInterpretorService} from '../services/data-interpretor.service'

@Component({
  selector: 'app-user-graph-sleep',
  templateUrl: './user-graph-sleep.component.html',
  styleUrls: ['./user-graph-sleep.component.css']
})
export class UserGraphSleepComponent implements OnInit {

  single: any[];
  multi: any[];
  view: any[] = [700, 400];
  logItems
  tooltipDisabled=true
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Level';
  showYAxisLabel = true;
  yAxisLabel = 'Date';
  showLabels = true
  currentUserLogItems

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  data1
  data2
  totalData
  // line, area
  autoScale = true;
  sleepQualityData
  data
  constructor(private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

    this.totalData = this.dataInterpretorService.getUserLogTimesByType('Sleep')
    console.log('this.totalData.data1Sleep')
    console.log(this.totalData)
    this.data = this.totalData.data1
    console.log(this.totalData.data1)
  }
  
  onSelect(event) {
    console.log(event);
  }

  ngOnInit(){
  }
}
