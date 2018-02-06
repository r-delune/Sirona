import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../data';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DataInterpretorService} from '../services/data-interpretor.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-user-graph-sleep-quality',
  templateUrl: './user-graph-sleep-quality.component.html',
  styleUrls: ['./user-graph-sleep-quality.component.css']
})
export class UserGraphSleepQualityComponent  {

  single: any[];
  multi: any[];

 // view: any[] = [700, 400];

  // options
  showXAxis = true;
  animations= true
  timeline = true
  tooltipDisabled = true
  referenceLines = [{name: 'High', value: '80'},{name: 'OK', value: '50'},{name: 'Low', value: '20'}]



  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;
  sleepQualityData
  data

  constructor(private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

    this.data = this.dataInterpretorService.getSleepQualityTrend()
    this.sleepQualityData = this.data.multiArray
    this.multi = this.data.multiArray
    this.single = this.data.singleArray
    console.log('sleepQualityData')
    console.log(this.sleepQualityData)

   // Object.assign(this, {single, multi})   
  }
}
