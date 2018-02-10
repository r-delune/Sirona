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
  view: any[] = [700, 400];
  logItems
  tooltipDisabled=true
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
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

      console.log('heloo!')

    this.data = this.dataInterpretorService.getSleepTrends()
    console.log('sleepQualityData')
    console.log(this.data)
  }
}
