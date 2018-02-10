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
  xAxisLabel = 'Level';
  showYAxisLabel = true;
  yAxisLabel = 'Date';
  getAppetiteMultiTrend
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  data
  multiArray

  animations= true
  timeline = true
  tooltipDisabled = true
  referenceLines = [{name: 'High', value: '80'},{name: 'OK', value: '50'},{name: 'Low', value: '20'}]
  singleArray

  //CHANGE apettite to apetitelvel
  constructor(private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

    this.data = this.dataInterpretorService.getDietTrends()
    console.log('data')
    console.log(this.data)
    //this.singleArray = this.data.singleArray
    //console.log('singleArray')
    //console.log(this.singleArray)

    Object.assign(this, {single, multi})  

    console.log(multi)
  }
}
