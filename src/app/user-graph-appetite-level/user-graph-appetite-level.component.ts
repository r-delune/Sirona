import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DataInterpretorService} from '../services/data-interpretor.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-user-graph-appetite-level',
  templateUrl: './user-graph-appetite-level.component.html',
  styleUrls: ['./user-graph-appetite-level.component.css']
})
export class UserGraphAppetiteLevelComponent {
  appetiteLevelData
  single: any[];
  multi: any[];
  view: any[] = [800, 440];
  logItems
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Level';
  getAppetiteMultiTrend
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  data
  multiArray
  showGridLines= true
  schemeType="ordinal"

  legendTitle="Diet/Exercise Data"
  animations= true
  timeline = false
  tooltipDisabled = true
  referenceLines = [{name: 'High', value: '80'},{name: 'OK', value: '50'},{name: 'Low', value: '20'}]
  singleArray

  //CHANGE apettite to apetitelvel
  constructor(private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

    this.data = this.dataInterpretorService.getDietTrends()
    console.log('data')
    console.log(this.data)
  }
}
