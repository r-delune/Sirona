import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../data';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DataInterpretorService} from '../services/data-interpretor.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-user-graph-general-mood',
  templateUrl: './user-graph-general-mood.component.html',
  styleUrls: ['./user-graph-general-mood.component.css']
})
export class UserGraphGeneralMoodComponent  {

  generalMoodData
  view: any[] = [800, 450];
  logItems
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Level';
  colorScheme = "fire"
  curve = shape.curveCardinal;
  legendTitle="Mood Data"
  animations= true
  timeline = false
  tooltipDisabled = true
  referenceLines = [{name: 'High', value: '80'},{name: 'OK', value: '50'},{name: 'Low', value: '20'}]
  
  // line, area
  autoScale = true;
  data
  totalData
  constructor(private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

    //this.generalMoodData = this.dataInterpretorService.getGeneralMoodTrend()
    this.data = this.dataInterpretorService.getMoodTrends()
    //this.data = this.totalData.multiArray
    
    console.log('Mood Item Trends')
    console.log(this.data)
  }

}
