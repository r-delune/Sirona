import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DataInterpretorService} from '../services/data-interpretor.service'

@Component({
  selector: 'app-user-graph-sleep',
  templateUrl: './user-graph-sleep.component.html',
  styleUrls: ['./user-graph-sleep.component.css']
})
export class UserGraphSleepComponent{

  view: any[] = [800, 440];
  tooltipDisabled=true
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Level';
  showLabels = true
  data
  legendTitle = 'Sleep Entries'
  colorScheme = "fire"

  constructor(private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

    this.data = this.dataInterpretorService.getUserLogInstancesByType('Sleep') 
    console.log('appetiteData data')
    console.log(this.data)
  }
}
