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
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  data

  constructor(private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

    this.data = this.dataInterpretorService.getEnergyLevelTrend()
    this.energyLevelData = this.data.multiArray
    console.log('energyLevelData')
    console.log(this.energyLevelData)
  }
}
