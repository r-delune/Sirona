import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../data';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DataInterpretorService} from '../services/data-interpretor.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-user-graph-general-mood',
  templateUrl: './user-graph-general-mood.component.html',
  styleUrls: ['./user-graph-general-mood.component.css']
})
export class UserGraphGeneralMoodComponent  {

  generalMoodData
  view: any[] = [700, 400];
  logItems
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Level';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  animations= true
  timeline = true
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
