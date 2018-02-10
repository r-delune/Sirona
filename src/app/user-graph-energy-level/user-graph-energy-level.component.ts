import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../data';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DataInterpretorService} from '../services/data-interpretor.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-user-graph-energy-level',
  templateUrl: './user-graph-energy-level.component.html',
  styleUrls: ['./user-graph-energy-level.component.css']
})
export class UserGraphEnergyLevelComponent {

  energyLevelData
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

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  data
  totalData
  animations= true
  timeline = true
  tooltipDisabled = true
  referenceLines = [{name: 'High', value: '80'},{name: 'OK', value: '50'},{name: 'Low', value: '20'}]


  constructor(private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

    this.totalData = this.dataInterpretorService.getEnergyLevelTrend()
    this.data = this.totalData.multiArray
    console.log('energyLevelData')
    console.log(this.data)
  }
}
