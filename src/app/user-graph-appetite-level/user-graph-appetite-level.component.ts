import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../data';
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
  view: any[] = [700, 400];
  logItems
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  getAppetiteMultiTrend
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  data

  animations= true
  timeline = true
  tooltipDisabled = true
  referenceLines = [{name: 'High', value: '80'},{name: 'OK', value: '50'},{name: 'Low', value: '20'}]


  //CHANGE apettite to apetitelvel
  constructor(private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

    this.data = this.dataInterpretorService.getAppetiteTrend()
    this.getAppetiteMultiTrend = this.data.multiArray
    console.log('getAppetiteMultiTrend')
    console.log(this.getAppetiteMultiTrend)
  }
}
