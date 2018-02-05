import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../data';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DataInterpretorService} from '../services/data-interpretor.service'

@Component({
  selector: 'app-user-graph-sleep-quality',
  templateUrl: './user-graph-sleep-quality.component.html',
  styleUrls: ['./user-graph-sleep-quality.component.css']
})
export class UserGraphSleepQualityComponent  {

  sleepQualityData

  constructor(private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

    this.sleepQualityData = this.dataInterpretorService.getSleepQualityTrend()
    console.log('sleepQualityData')
    console.log(this.sleepQualityData)
  }
}
